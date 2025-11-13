import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { users, youtubeChannels } from '@/lib/db';
import { youTubeAPI } from '@/lib/youtube';
import { nanoid } from 'nanoid';
import { getDb } from '@/lib/db';

/**
 * GET /api/auth/youtube/callback
 * Handles OAuth callback from Google, exchanges code for tokens, and saves channel data
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  try {
    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=oauth_error&message=${encodeURIComponent(error)}`
      );
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=missing_params`
      );
    }

    // Decode and validate state
    let stateData;
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    } catch {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=invalid_state`
      );
    }

    const { userId, timestamp } = stateData;
    
    // Check state timestamp (should be within 10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=expired_state`
      );
    }

    const db = getDb();
    
    // Verify user exists in database
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (existingUser.length === 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=user_not_found`
      );
    }

    // Exchange code for tokens
    const tokenResponse = await youTubeAPI.exchangeCodeForTokens(code);
    
    // Get user's YouTube channels
    const channels = await youTubeAPI.getChannels(tokenResponse.access_token);
    
    if (channels.length === 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=no_channels`
      );
    }

    // Process and save each channel
    const savedChannels = [];
    
    for (const channel of channels) {
      const channelData = {
        id: nanoid(),
        userId,
        channelId: channel.id,
        channelName: channel.snippet.title,
        channelDescription: channel.snippet.description || '',
        channelThumbnail: channel.snippet.thumbnails?.high?.url || channel.snippet.thumbnails?.default?.url || '',
        subscriberCount: parseInt(channel.statistics?.subscriberCount || '0'),
        videoCount: parseInt(channel.statistics?.videoCount || '0'),
        viewCount: parseInt(channel.statistics?.viewCount || '0'),
        uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads || '',
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        tokenExpiresAt: new Date(Date.now() + (tokenResponse.expires_in * 1000)),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        // Check if channel already exists for this user
        const existingChannel = await db
          .select()
          .from(youtubeChannels)
          .where(
            and(
              eq(youtubeChannels.userId, userId),
              eq(youtubeChannels.channelId, channel.id)
            )
          )
          .limit(1);

        if (existingChannel.length > 0) {
          // Update existing channel
          await db
            .update(youtubeChannels)
            .set({
              channelName: channelData.channelName,
              channelDescription: channelData.channelDescription,
              channelThumbnail: channelData.channelThumbnail,
              subscriberCount: channelData.subscriberCount,
              videoCount: channelData.videoCount,
              viewCount: channelData.viewCount,
              accessToken: channelData.accessToken,
              refreshToken: channelData.refreshToken,
              tokenExpiresAt: channelData.tokenExpiresAt,
              isActive: true,
              updatedAt: new Date(),
            })
            .where(eq(youtubeChannels.id, existingChannel[0].id));

          savedChannels.push({ ...existingChannel[0], ...channelData });
        } else {
          // Insert new channel
          await db.insert(youtubeChannels).values(channelData);
          savedChannels.push(channelData);
        }
      } catch (dbError) {
        console.error('Database error while saving channel:', dbError);
        // Continue with other channels if one fails
      }
    }

    if (savedChannels.length === 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=save_failed`
      );
    }

    // Redirect to dashboard with success message
    const channelNames = savedChannels.map(ch => ch.channelName).join(', ');
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=youtube_connected&channels=${encodeURIComponent(channelNames)}`
    );

  } catch (error) {
    console.error('YouTube OAuth callback error:', error);
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?error=callback_failed&message=${encodeURIComponent(
        process.env.NODE_ENV === 'development' ? error.message : 'Authentication failed'
      )}`
    );
  }
}