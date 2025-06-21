import { NextResponse } from "next/server";
import { getAIService } from "@/lib/cloudflare-ai";
import { YouTubeSettings } from "@/lib/settings";

// Force dynamic runtime to prevent static generation
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req, env) {
  try {
    const { message, context } = await req.json();

    // Get AI service with Cloudflare AI binding
    const aiService = getAIService(env);

    const prompt = `You are CreoYT AI Assistant, an expert in YouTube growth and content strategy.

    Users YouTube channel details in JSON Format: 
    ${YouTubeSettings}

Previous conversation:
${context}

Current query: ${message}

Please provide helpful advice for the current query. Keep responses concise and actionable.`;

    const result = await aiService.generateContent(prompt, {
      maxTokens: 2048,
      temperature: 0.7
    });

    if (!result.success) {
      throw new Error(result.error || 'Failed to generate response');
    }

    return NextResponse.json({
      content: result.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
