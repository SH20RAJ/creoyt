import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { getDb, contentProjects } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body: any = await request.json();
    const { title, content = '', contentType = 'video' } = body || {};
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const db = getDb();
    const id = nanoid();
    await db.insert(contentProjects).values({
      id,
      userId: user.id,
      title,
      content,
      contentType,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, id });
  } catch (e) {
    console.error('Project create error:', e);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
