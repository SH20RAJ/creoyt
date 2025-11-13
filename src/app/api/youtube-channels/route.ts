import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { eq, and } from 'drizzle-orm';
import { youtubeChannels, users } from '@/lib/db';
import { getDb } from '@/lib/db';

/**
 * GET /api/youtube-channels
 * Get all YouTube channels connected to the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user authentication
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    
    // Ensure user exists in database
    const existingUser = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
    if (existingUser.length === 0) {
      // Create user record if it doesn't exist
      await db.insert(users).values({
        id: user.id,
        email: user.primaryEmail || '',
        displayName: user.displayName || '',
        profileImageUrl: user.profileImageUrl || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Get user's YouTube channels
    const channels = await db
      .select({
        id: youtubeChannels.id,
        channelId: youtubeChannels.channelId,
        channelName: youtubeChannels.channelName,
        channelDescription: youtubeChannels.channelDescription,
        channelThumbnail: youtubeChannels.channelThumbnail,
        subscriberCount: youtubeChannels.subscriberCount,
        videoCount: youtubeChannels.videoCount,
        viewCount: youtubeChannels.viewCount,
        isActive: youtubeChannels.isActive,
        createdAt: youtubeChannels.createdAt,
        updatedAt: youtubeChannels.updatedAt,
        tokenExpiresAt: youtubeChannels.tokenExpiresAt,
      })
      .from(youtubeChannels)
      .where(
        and(
          eq(youtubeChannels.userId, user.id),
          eq(youtubeChannels.isActive, true)
        )
      );

    // Check token expiry status for each channel
    const channelsWithStatus = channels.map(channel => ({
      ...channel,
      tokenExpired: new Date(channel.tokenExpiresAt) <= new Date(),
      daysUntilExpiry: Math.ceil(
        (new Date(channel.tokenExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    }));

    return NextResponse.json({
      success: true,
      channels: channelsWithStatus,
      totalChannels: channels.length,
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.primaryEmail,
      }
    });

  } catch (error) {
    console.error('Error fetching YouTube channels:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch YouTube channels',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/youtube-channels?channelId=xxx
 * Disconnect a YouTube channel from user account
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify user authentication
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    // Verify channel belongs to user
    const channel = await db
      .select()
      .from(youtubeChannels)
      .where(
        and(
          eq(youtubeChannels.id, channelId),
          eq(youtubeChannels.userId, user.id)
        )
      )
      .limit(1);

    if (channel.length === 0) {
      return NextResponse.json({ error: 'Channel not found or not authorized' }, { status: 404 });
    }

    // Soft delete - set as inactive instead of hard delete to preserve data
    await db
      .update(youtubeChannels)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(youtubeChannels.id, channelId));

    return NextResponse.json({
      success: true,
      message: 'Channel disconnected successfully',
      channelName: channel[0].channelName
    });

  } catch (error) {
    console.error('Error disconnecting YouTube channel:', error);
    return NextResponse.json(
      {
        error: 'Failed to disconnect channel',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}