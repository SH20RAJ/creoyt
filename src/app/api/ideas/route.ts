import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { getDb, aiSuggestions } from '@/lib/db';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, description = '', contentType = 'video', prompt = '' } = body || {};
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const db = getDb();
    const id = nanoid();
    await db.insert(aiSuggestions).values({
      id,
      userId: user.id,
      title,
      description,
      contentType,
      prompt,
      trending: false,
      difficulty: 'medium',
      estimatedEngagement: 75,
      source: 'ai',
      isUsed: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id });
  } catch (e) {
    console.error('Ideas save error:', e);
    return NextResponse.json({ error: 'Failed to save idea' }, { status: 500 });
  }
}

