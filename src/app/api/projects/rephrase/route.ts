import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { OpenAIService } from '@/lib/ai/openai-service';

const defaultPrompts: Record<string, string> = {
  title: 'Rewrite this YouTube title to improve click-through rate while staying under 100 characters.',
  description: 'Rewrite this YouTube video description. Make it SEO-friendly, conversational, and include clear sections with bullet points and timestamps when relevant.',
  tags: 'Return a comma-separated list of SEO-focused YouTube tags. Keep each tag concise and relevant.',
  playlists: 'Suggest comma-separated playlist names that match the topic.',
  keywords: 'Suggest comma-separated long-tail keywords relevant to the topic.',
  thumbnailPrompt: 'Rewrite this thumbnail prompt to be vivid and direct for an AI image generator.',
};

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!OpenAIService.isConfigured()) {
      return NextResponse.json({ error: 'OpenAI not configured' }, { status: 503 });
    }

    const body: any = await request.json();
    const field = (body.field || '').toString();
    const text = (body.text || '').toString();
    const extraPrompt = (body.prompt || '').toString();
    if (!field || !text) return NextResponse.json({ error: 'Missing field or text' }, { status: 400 });

    const prompt = extraPrompt || defaultPrompts[field] || 'Improve this text.';

    const openai = new OpenAIService();
    const completion = await openai.generateContent([
      {
        role: 'system',
        content: `You are a senior YouTube strategist and copywriter. Return only the revised text.
If producing lists (tags/keywords), return a comma-separated list without numbering.`,
      },
      {
        role: 'user',
        content: `${prompt}\n\nOriginal:\n${text}`,
      },
    ], { maxTokens: 600, temperature: 0.7, model: 'gpt-4o-mini' });

    const result = completion.choices?.[0]?.message?.content?.trim() || text;
    return NextResponse.json({ result });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
