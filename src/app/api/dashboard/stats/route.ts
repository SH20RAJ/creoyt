
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { contentProjects, youtubeChannels, youtubeVideos } from '@/lib/db/schema';
import { eq, sql, and, ne } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Fetch Content Projects Stats
    const [projectsStats] = await db
      .select({
        totalProjects: sql<number>`count(*)`,
        totalWords: sql<number>`sum(${contentProjects.wordCount})`,
        activeProjects: sql<number>`sum(case when ${contentProjects.status} != 'published' then 1 else 0 end)`
      })
      .from(contentProjects)
      .where(eq(contentProjects.userId, userId));

    // Fetch YouTube Stats
    const [ytChannelStats] = await db
      .select({
        totalSubscribers: sql<number>`sum(${youtubeChannels.subscriberCount})`,
        totalViews: sql<number>`sum(${youtubeChannels.viewCount})`,
        totalVideos: sql<number>`sum(${youtubeChannels.videoCount})`
      })
      .from(youtubeChannels)
      .where(and(eq(youtubeChannels.userId, userId), eq(youtubeChannels.isActive, true)));

    // Calculate engagement (mock for now as we don't have direct engagement data in projects yet)
    // In a real scenario, this would come from analytics tables
    const avgEngagement = 0;

    const stats = {
      totalProjects: projectsStats?.totalProjects || 0,
      activeProjects: projectsStats?.activeProjects || 0,
      totalWords: projectsStats?.totalWords || 0,
      avgEngagement,

      youtube: {
        subscribers: ytChannelStats?.totalSubscribers || 0,
        views: ytChannelStats?.totalViews || 0,
        videos: ytChannelStats?.totalVideos || 0
      },

      // Keep these as placeholders or calculate if possible
      weeklyStats: {
        projectsCreated: 0, // Would need time-based query
        wordsWritten: 0,
        avgSessionTime: 0,
        completionRate: 0
      },

      contentTypes: {
        blog: 0, // Can be fetched with group by
        social: 0,
        email: 0,
        marketing: 0
      },

      performance: {
        topPerformingType: 'N/A',
        avgWordsPerProject: projectsStats?.totalProjects ? Math.floor((projectsStats.totalWords || 0) / projectsStats.totalProjects) : 0,
        projectsThisMonth: 0,
        streakDays: 0
      },

      growth: {
        projectsGrowth: 0,
        engagementGrowth: 0,
        productivityGrowth: 0,
      },

      achievements: [] // Implement achievement system later
    };

    return NextResponse.json({
      stats,
      lastUpdated: new Date().toISOString(),
      userId
    });

  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}