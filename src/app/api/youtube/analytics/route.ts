import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { eq, and, gte, lte } from 'drizzle-orm';
import { getDb, youtubeChannels, youtubeAnalytics } from '@/lib/db';
import { youTubeAPI } from '@/lib/youtube';
import { nanoid } from 'nanoid';

/**
 * GET /api/youtube/analytics?channelId=xxx&startDate=2024-01-01&endDate=2024-12-31&refresh=true
 * Fetches YouTube Analytics data for a channel
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
    const startDate = searchParams.get('startDate') || '2024-01-01';
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];
    const refresh = searchParams.get('refresh') === 'true';

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 });
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

    // Return cached analytics if not refreshing and data exists
    if (!refresh) {
      const cachedAnalytics = await db
        .select()
        .from(youtubeAnalytics)
        .where(
          and(
            eq(youtubeAnalytics.channelId, channelData.id),
            gte(youtubeAnalytics.date, startDate),
            lte(youtubeAnalytics.date, endDate)
          )
        );

      if (cachedAnalytics.length > 0) {
        return NextResponse.json({
          success: true,
          analytics: cachedAnalytics,
          fromCache: true,
          channel: {
            id: channelData.id,
            name: channelData.channelName,
          },
          dateRange: { startDate, endDate }
        });
      }
    }

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

    // Fetch analytics data from YouTube Analytics API
    const analyticsResponse = await youTubeAPI.getChannelAnalytics(
      accessToken,
      channelData.channelId,
      startDate,
      endDate
    );

    if (!analyticsResponse.rows || analyticsResponse.rows.length === 0) {
      return NextResponse.json({
        success: true,
        analytics: [],
        fromCache: false,
        message: 'No analytics data available for the specified date range',
        dateRange: { startDate, endDate }
      });
    }

    // Process analytics data
    const processedAnalytics = [];
    
    // Map column headers to data
    const headers = (analyticsResponse.columnHeaders as any[] | undefined)?.map((h: any) => h.name) || [];
    
    for (const row of analyticsResponse.rows) {
      const analyticsData = {
        id: nanoid(),
        channelId: channelData.id,
        videoId: null, // This is channel-level data
        date: startDate, // For aggregated data, use start date
        views: 0,
        watchTimeMinutes: 0,
        subscribersGained: 0,
        subscribersLost: 0,
        likes: 0,
        dislikes: 0,
        comments: 0,
        shares: 0,
        estimatedRevenue: 0,
        impressions: 0,
        clickThroughRate: 0,
        averageViewDuration: 0,
        createdAt: new Date(),
      };

      // Map row data to analytics object based on headers
      headers.forEach((header: string, index: number) => {
        const value: any = row[index] || 0;
        
        switch (header) {
          case 'views':
            analyticsData.views = parseInt(value);
            break;
          case 'estimatedMinutesWatched':
            analyticsData.watchTimeMinutes = parseInt(value);
            break;
          case 'subscribersGained':
            analyticsData.subscribersGained = parseInt(value);
            break;
          case 'subscribersLost':
            analyticsData.subscribersLost = parseInt(value);
            break;
          case 'likes':
            analyticsData.likes = parseInt(value);
            break;
          case 'dislikes':
            analyticsData.dislikes = parseInt(value);
            break;
          case 'comments':
            analyticsData.comments = parseInt(value);
            break;
          case 'shares':
            analyticsData.shares = parseInt(value);
            break;
          case 'impressions':
            analyticsData.impressions = parseInt(value);
            break;
          case 'impressionClickThroughRate':
            analyticsData.clickThroughRate = Math.round(parseFloat(value) * 100); // Convert to percentage * 100
            break;
        }
      });

      try {
        // Check if analytics data already exists for this date
        const existingAnalytics = await db
          .select()
          .from(youtubeAnalytics)
          .where(
            and(
              eq(youtubeAnalytics.channelId, channelData.id),
              eq(youtubeAnalytics.date, analyticsData.date)
            )
          )
          .limit(1);

        if (existingAnalytics.length > 0) {
          // Update existing analytics
          await db
            .update(youtubeAnalytics)
            .set({
              views: analyticsData.views,
              watchTimeMinutes: analyticsData.watchTimeMinutes,
              subscribersGained: analyticsData.subscribersGained,
              subscribersLost: analyticsData.subscribersLost,
              likes: analyticsData.likes,
              dislikes: analyticsData.dislikes,
              comments: analyticsData.comments,
              shares: analyticsData.shares,
              impressions: analyticsData.impressions,
              clickThroughRate: analyticsData.clickThroughRate,
            })
            .where(eq(youtubeAnalytics.id, existingAnalytics[0].id));

          processedAnalytics.push({ ...existingAnalytics[0], ...analyticsData });
        } else {
          // Insert new analytics data
          await db.insert(youtubeAnalytics).values(analyticsData);
          processedAnalytics.push(analyticsData);
        }
      } catch (dbError) {
        console.error('Error saving analytics to database:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      analytics: processedAnalytics,
      fromCache: false,
      channel: {
        id: channelData.id,
        name: channelData.channelName,
      },
      dateRange: { startDate, endDate },
      totalRecords: processedAnalytics.length
    });

  } catch (error) {
    const err = error as Error;
    console.error('Error fetching YouTube analytics:', err);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    );
  }
}
