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

export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const res = await db.select().from(contentProjects).where(eq(contentProjects.userId, user.id));
    return NextResponse.json({ projects: res });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const db = getDb();
    await db.delete(contentProjects).where(eq(contentProjects.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
