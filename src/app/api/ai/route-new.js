import { getAIService } from '@/lib/cloudflare-ai';
import { NextResponse } from "next/server";

// Force dynamic runtime to prevent static generation
export const dynamic = 'force-dynamic';

export async function POST(req, env) {
  try {
    const { prompt, type = 'general' } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get AI service with Cloudflare AI binding
    const aiService = getAIService(env);

    let result;

    switch (type) {
      case 'ideas':
        result = await aiService.generateIdeas(prompt);
        break;
      case 'tags':
        result = await aiService.generateTags(prompt);
        break;
      case 'analysis':
        result = await aiService.analyzeText(prompt);
        break;
      default:
        result = await aiService.generateContent(prompt, {
          systemPrompt: 'You are a helpful AI assistant that provides creative and accurate responses.',
          maxTokens: 1024,
          temperature: 0.7
        });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in AI API:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
