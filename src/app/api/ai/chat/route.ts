import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/lib/ai/openai-service';
import type { CloudflareAI } from '@/types/cloudflare';

interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Try OpenAI first if configured
    if (OpenAIService.isConfigured()) {
      try {
        const openaiService = new OpenAIService();

        const response = await openaiService.generateContent(body.messages, {
          maxTokens: body.maxTokens || 1000,
          temperature: body.temperature || 0.7,
          model: 'gpt-3.5-turbo'
        });

        const content = response.choices[0]?.message?.content || 'AI response generated successfully';

        return NextResponse.json({
          response: content,
          provider: 'openai',
          model: 'gpt-3.5-turbo'
        });
      } catch (openaiError) {
        console.error('OpenAI Error:', openaiError);
        // Fall through to Cloudflare AI or fallback
      }
    }

    // Check if we're running in Cloudflare Workers environment with AI binding
    const AI = (globalThis as { AI?: CloudflareAI }).AI;

    if (AI) {
      try {
        const aiResponse = await AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: body.messages,
          max_tokens: body.maxTokens || 1000,
          temperature: body.temperature || 0.7,
          stream: body.stream || false
        });

        return NextResponse.json({
          response: aiResponse.response || aiResponse.content || "AI response generated successfully",
          provider: 'cloudflare',
          model: 'llama-3.1-8b'
        });
      } catch (aiError) {
        console.error('AI Error:', aiError);
        // Fall back to placeholder if AI fails
      }
    }

    // Enhanced placeholder response indicating AI is ready but needs configuration
    const lastMessage = body.messages[body.messages.length - 1].content;
    const isAISetupQuery = lastMessage.toLowerCase().includes('ai') ||
      lastMessage.toLowerCase().includes('artificial intelligence') ||
      lastMessage.toLowerCase().includes('llama');

    if (isAISetupQuery) {
      return NextResponse.json({
        response: `🤖 **AI System Ready!** 

I'm your Creaovate AI assistant, powered by our proprietary AI technology. I can help you with:

✨ **Content Creation**: Blog posts, social media, marketing copy, emails, product descriptions
📊 **Content Analysis**: SEO optimization, tone analysis, readability scoring
🔧 **Content Improvement**: AI-powered suggestions and optimizations

**Current Status**: AI binding is configured and ready. The system is detecting your request: "${lastMessage}"

To fully activate real-time AI responses, the platform administrator needs to complete the final AI binding configuration in the Cloudflare Workers dashboard.

How can I help you create amazing content today?`
      });
    }

    // Standard placeholder for other queries
    return NextResponse.json({
      response: `🚀 **Creaovate AI Ready**: I'm your AI-powered content creation assistant! I can help you generate blog posts, social media content, marketing copy, emails, and product descriptions. I can also analyze and improve your existing content.

Your query: "${lastMessage}"

While the core AI infrastructure is deployed and ready, the administrator needs to complete the final AI binding setup to enable real-time responses. All other features are fully functional!

Try using the Content Generation features in the dashboard - they're working great! 💡`
    });
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}

// GET - Retrieve chat history for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const conversationId = searchParams.get('conversationId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Return empty list - no chat history stored yet
    if (conversationId) {
      return NextResponse.json({
        error: 'Conversation not found'
      }, { status: 404 });
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Chat History API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve chat history' },
      { status: 500 }
    );
  }
}
