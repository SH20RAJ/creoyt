import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { getDb, youtubeChannels } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { youTubeAPI } from '@/lib/youtube';
import { OpenAIService } from '@/lib/ai/openai-service';

type Mode = 'ai' | 'scraped';

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body: any = await request.json();
    const query = (body?.query || '').toString();
    const mode: Mode = (body?.mode || 'ai') as Mode;
    const channelId = (body?.channelId || '').toString();
    if (!query) return NextResponse.json({ error: 'Query is required' }, { status: 400 });

    // Build context when scraped mode is selected
    let scrapedContext = '';
    if (mode === 'scraped' && channelId) {
      const db = getDb();
      const rows = await db.select().from(youtubeChannels).where(eq(youtubeChannels.id, channelId)).limit(1);
      if (rows.length) {
        let accessToken = rows[0].accessToken;
        // Basic refresh if expired
        if (new Date(rows[0].tokenExpiresAt) <= new Date()) {
          try {
            const tokenResponse = await youTubeAPI.refreshAccessToken(rows[0].refreshToken);
            accessToken = tokenResponse.access_token;
          } catch {
            // fall back to stale token
          }
        }

        // Search top videos and collect metadata
        try {
          const ids = await youTubeAPI.searchVideos(accessToken, query, 8);
          const details = await youTubeAPI.getVideoDetails(accessToken, ids);
          const topMeta = details.map(v => ({
            title: v.snippet.title,
            description: v.snippet.description,
            tags: v.snippet.tags || [],
            stats: v.statistics,
          }));
          scrapedContext = JSON.stringify(topMeta).slice(0, 5000); // keep prompt size reasonable
        } catch (e) {
          // ignore scraping failure, still generate purely via AI
        }
      }
    }

    if (!OpenAIService.isConfigured()) {
      // Minimal fallback without OpenAI
      return NextResponse.json({
        title: query,
        description: `Video about: ${query}`,
        thumbnailPrompt: `Design a bold thumbnail for: ${query}`,
        tags: [query, 'how to', 'tutorial'],
        playlists: ['General'],
        keywords: [query],
        source: mode,
      });
    }

    const openai = new OpenAIService();
    const system = mode === 'scraped'
      ? `You are an expert YouTube SEO strategist. You receive a user idea and a JSON list of top competitor videos (title/description/tags/stats). Generate a JSON object with: title, description, thumbnailPrompt, tags[], playlists[], keywords[]. Optimize for CTR and ranking.`
      : `You are an expert YouTube content creator. For a user idea, generate a JSON object with: title, description, thumbnailPrompt, tags[], playlists[], keywords[]. Optimize for clarity, CTR, and retention.`;

    const userPrompt = mode === 'scraped'
      ? `Idea: ${query}\n\nCompetitor JSON (may be empty): ${scrapedContext}\n\nReturn only JSON with those fields.`
      : `Idea: ${query}\n\nReturn only JSON with the fields specified.`;

    const completion = await openai.generateContent([
      { role: 'system', content: system },
      { role: 'user', content: userPrompt },
    ], { maxTokens: 900, temperature: 0.7, model: 'gpt-3.5-turbo' });

    const content = completion.choices?.[0]?.message?.content || '{}';
    try {
      const json = JSON.parse(content);
      return NextResponse.json({ ...json, source: mode });
    } catch {
      // Try to extract JSON substring
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try { return NextResponse.json({ ...JSON.parse(match[0]), source: mode }); } catch {}
      }
      return NextResponse.json({
        title: query,
        description: content,
        thumbnailPrompt: `Thumbnail for: ${query}`,
        tags: [query],
        playlists: ['General'],
        keywords: [query],
        source: mode,
      });
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
