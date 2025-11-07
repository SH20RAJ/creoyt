import { NextRequest, NextResponse } from 'next/server';

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

    // In a real app, you would calculate these from database
    // For demo purposes, return realistic stats that change over time
    const baseDate = new Date();
    const daysSinceSignup = Math.floor((baseDate.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate stats that grow over time but have some randomness
    const totalProjects = Math.min(50, Math.floor(daysSinceSignup / 7) + Math.floor(Math.random() * 5));
    const activeProjects = Math.min(totalProjects, Math.floor(totalProjects * 0.6) + Math.floor(Math.random() * 3));
    const totalWords = totalProjects * 1200 + Math.floor(Math.random() * 10000);
    const avgEngagement = 65 + Math.floor(Math.random() * 25); // Between 65-90%

    // Additional detailed stats
    const stats = {
      totalProjects,
      activeProjects,
      totalWords,
      avgEngagement,
      
      // Extended analytics
      weeklyStats: {
        projectsCreated: Math.floor(Math.random() * 5) + 2,
        wordsWritten: Math.floor(Math.random() * 5000) + 2000,
        avgSessionTime: Math.floor(Math.random() * 30) + 15, // minutes
        completionRate: Math.floor(Math.random() * 20) + 75 // percentage
      },
      
      contentTypes: {
        blog: Math.floor(totalProjects * 0.4),
        social: Math.floor(totalProjects * 0.3),
        email: Math.floor(totalProjects * 0.2),
        marketing: Math.floor(totalProjects * 0.1)
      },
      
      performance: {
        topPerformingType: ['blog', 'social', 'email', 'marketing'][Math.floor(Math.random() * 4)],
        avgWordsPerProject: Math.floor(totalWords / Math.max(1, totalProjects)),
        projectsThisMonth: Math.floor(Math.random() * 8) + 3,
        streakDays: Math.floor(Math.random() * 15) + 1
      },
      
      growth: {
        projectsGrowth: Math.floor(Math.random() * 40) + 20, // 20-60% growth
        engagementGrowth: Math.floor(Math.random() * 30) + 10, // 10-40% growth
        productivityGrowth: Math.floor(Math.random() * 50) + 25, // 25-75% growth
      },
      
      achievements: [
        { id: 1, title: 'First Project', description: 'Created your first AI-generated content', unlocked: true },
        { id: 2, title: 'Content Creator', description: 'Generated 10+ pieces of content', unlocked: totalProjects >= 10 },
        { id: 3, title: 'Productivity Master', description: 'Maintained 7-day creation streak', unlocked: Math.random() > 0.6 },
        { id: 4, title: 'Engagement Expert', description: 'Achieved 80%+ average engagement', unlocked: avgEngagement >= 80 },
        { id: 5, title: 'Word Wizard', description: 'Written 25,000+ words', unlocked: totalWords >= 25000 }
      ]
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