
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { contentProjects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

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

    const recentProjects = await db
      .select()
      .from(contentProjects)
      .where(eq(contentProjects.userId, userId))
      .orderBy(desc(contentProjects.createdAt))
      .limit(5);

    const content = recentProjects.map(project => ({
      id: project.id,
      title: project.title,
      content: project.content,
      type: project.contentType,
      createdAt: project.createdAt,
      stats: {
        words: project.wordCount || 0,
        readTime: project.estimatedReadTime || 0,
        sentiment: project.sentiment || 'neutral'
      }
    }));

    return NextResponse.json({
      content,
      total: content.length,
      userId
    });

  } catch (error) {
    console.error('Recent Content API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent content' },
      { status: 500 }
    );
  }
}