import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { getDb, contentProjects } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const rows = await db.select().from(contentProjects).where(eq(contentProjects.id, params.id));
    const row = rows[0];
    if (!row || row.userId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project: row });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body: any = await request.json();

    const db = getDb();
    const rows = await db.select().from(contentProjects).where(eq(contentProjects.id, params.id));
    const row = rows[0];
    if (!row || row.userId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Merge content JSON
    let contentJson: any = {};
    try { contentJson = JSON.parse(row.content || '{}'); } catch {}
    const merged = {
      ...contentJson,
      title: body.title ?? contentJson.title,
      description: body.description ?? contentJson.description,
      thumbnailPrompt: body.thumbnailPrompt ?? contentJson.thumbnailPrompt,
      tags: body.tags ?? contentJson.tags,
      playlists: body.playlists ?? contentJson.playlists,
      keywords: body.keywords ?? contentJson.keywords,
      thumbnailUrl: body.thumbnailUrl ?? contentJson.thumbnailUrl,
      lastEditedAt: new Date().toISOString(),
    };

    await db.update(contentProjects)
      .set({
        title: (body.title as string) ?? row.title,
        content: JSON.stringify(merged),
        updatedAt: new Date(),
      })
      .where(eq(contentProjects.id, params.id));

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
