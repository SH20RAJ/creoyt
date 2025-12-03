import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { OpenAIService } from '@/lib/ai/openai-service';

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!OpenAIService.isConfigured()) {
      return NextResponse.json({ error: 'OpenAI not configured' }, { status: 503 });
    }

    const body: any = await request.json();
    const prompt = (body?.prompt || '').toString();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const openai = new OpenAIService();
    const data = await openai.generateImage(prompt, { size: '1024x1024' });
    const base64 = data?.data?.[0]?.b64_json;
    if (!base64) return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });

    return NextResponse.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

