import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { eq, and, desc } from 'drizzle-orm';
import { getDb, youtubeChannels, youtubeVideos } from '@/lib/db';
import { youTubeAPI } from '@/lib/youtube';
import { nanoid } from 'nanoid';

/**
 * GET /api/youtube/videos?channelId=xxx&refresh=true
 * Fetches latest videos from user's YouTube channel
 */
export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    // Verify user authentication
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const refresh = searchParams.get('refresh') === 'true';
    const maxResults = parseInt(searchParams.get('maxResults') || '20');

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    // Get user's YouTube channel
    const channel = await db
      .select()
      .from(youtubeChannels)
      .where(
        and(
          eq(youtubeChannels.id, channelId),
          eq(youtubeChannels.userId, user.id),
          eq(youtubeChannels.isActive, true)
        )
      )
      .limit(1);

    if (channel.length === 0) {
      return NextResponse.json({ error: 'Channel not found or not authorized' }, { status: 404 });
    }

    const channelData = channel[0];

    // Check if token is expired and refresh if needed
    let accessToken = channelData.accessToken;
    if (new Date(channelData.tokenExpiresAt) <= new Date()) {
      try {
        const tokenResponse = await youTubeAPI.refreshAccessToken(channelData.refreshToken);
        accessToken = tokenResponse.access_token;
        
        // Update token in database
        await db
          .update(youtubeChannels)
          .set({
            accessToken: tokenResponse.access_token,
            tokenExpiresAt: new Date(Date.now() + (tokenResponse.expires_in * 1000)),
            updatedAt: new Date(),
          })
          .where(eq(youtubeChannels.id, channelData.id));
      } catch (tokenError) {
        console.error('Token refresh failed:', tokenError);
        return NextResponse.json(
          { error: 'YouTube authentication expired. Please reconnect your account.' },
          { status: 401 }
        );
      }
    }

    // Return cached videos if not refreshing
    if (!refresh) {
      const cachedVideos = await db
        .select()
        .from(youtubeVideos)
        .where(eq(youtubeVideos.channelId, channelData.id))
        .orderBy(desc(youtubeVideos.publishedAt))
        .limit(maxResults);

      if (cachedVideos.length > 0) {
        return NextResponse.json({
          success: true,
          videos: cachedVideos,
          fromCache: true,
          channel: {
            id: channelData.id,
            name: channelData.channelName,
            thumbnail: channelData.channelThumbnail,
          }
        });
      }
    }

    // Fetch fresh data from YouTube API
    if (!channelData.uploadsPlaylistId) {
      return NextResponse.json({ error: 'Uploads playlist not found for this channel' }, { status: 400 });
    }

    // Get playlist items (videos)
    const playlistItems = await youTubeAPI.getPlaylistVideos(
      accessToken,
      channelData.uploadsPlaylistId,
      maxResults
    );

    if (playlistItems.length === 0) {
      return NextResponse.json({
        success: true,
        videos: [],
        fromCache: false,
        message: 'No videos found in this channel'
      });
    }

    // Extract video IDs
    const videoIds = playlistItems.map(item => item.contentDetails.videoId).filter(Boolean);

    // Get detailed video information
    const videoDetails = await youTubeAPI.getVideoDetails(accessToken, videoIds);

    // Process and save videos to database
    const processedVideos = [];
    
    for (const video of videoDetails) {
      const videoData = {
        id: nanoid(),
        channelId: channelData.id,
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description || '',
        thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || '',
        publishedAt: new Date(video.snippet.publishedAt),
        duration: video.contentDetails?.duration || '',
        tags: JSON.stringify(video.snippet.tags || []),
        categoryId: video.snippet.categoryId || '',
        viewCount: parseInt(video.statistics?.viewCount || '0'),
        likeCount: parseInt(video.statistics?.likeCount || '0'),
        dislikeCount: parseInt(video.statistics?.dislikeCount || '0'),
        commentCount: parseInt(video.statistics?.commentCount || '0'),
        engagementRate: youTubeAPI.calculateEngagementRate(
          parseInt(video.statistics?.likeCount || '0'),
          parseInt(video.statistics?.dislikeCount || '0'),
          parseInt(video.statistics?.commentCount || '0'),
          parseInt(video.statistics?.viewCount || '0')
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        // Check if video already exists
        const existingVideo = await db
          .select()
          .from(youtubeVideos)
          .where(eq(youtubeVideos.videoId, video.id))
          .limit(1);

        if (existingVideo.length > 0) {
          // Update existing video
          await db
            .update(youtubeVideos)
            .set({
              title: videoData.title,
              description: videoData.description,
              thumbnail: videoData.thumbnail,
              tags: videoData.tags,
              viewCount: videoData.viewCount,
              likeCount: videoData.likeCount,
              dislikeCount: videoData.dislikeCount,
              commentCount: videoData.commentCount,
              engagementRate: videoData.engagementRate,
              updatedAt: new Date(),
            })
            .where(eq(youtubeVideos.id, existingVideo[0].id));

          processedVideos.push({ ...existingVideo[0], ...videoData });
        } else {
          // Insert new video
          await db.insert(youtubeVideos).values(videoData);
          processedVideos.push(videoData);
        }
      } catch (dbError) {
        console.error('Error saving video to database:', dbError);
        // Continue with other videos
      }
    }

    return NextResponse.json({
      success: true,
      videos: processedVideos,
      fromCache: false,
      channel: {
        id: channelData.id,
        name: channelData.channelName,
        thumbnail: channelData.channelThumbnail,
      },
      totalFetched: processedVideos.length
    });

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch videos',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
