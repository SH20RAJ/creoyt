import { getAIService } from '@/lib/cloudflare-ai';
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function POST(request, env) {
  try {
    const { prompt, type = 'content', options = {} } = await request.json();

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
        result = await aiService.generateIdeas(prompt, options);
        break;
      case 'tags':
        result = await aiService.generateTags(prompt);
        break;
      case 'analysis':
        result = await aiService.analyzeText(prompt, options.analysisType || 'general');
        break;
      case 'content':
      default:
        result = await aiService.generateContent(prompt, {
          systemPrompt: options.systemPrompt || 'You are a helpful content creator that generates engaging and creative content.',
          maxTokens: options.maxTokens || 1024,
          temperature: options.temperature || 0.7
        });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}