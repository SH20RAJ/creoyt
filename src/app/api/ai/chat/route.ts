import { NextRequest, NextResponse } from 'next/server';

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

    // In development mode, return a placeholder response
    // In production (Cloudflare Workers), the AI service would be available
    return NextResponse.json({
      response: "This is a development placeholder. In production, this would connect to Cloudflare Workers AI with Llama 3.1 to process your request: " + body.messages[body.messages.length - 1].content,
      usage: {
        prompt_tokens: Math.floor(Math.random() * 50) + 10,
        completion_tokens: Math.floor(Math.random() * 100) + 20,
        total_tokens: Math.floor(Math.random() * 150) + 30
      }
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

    // For development, return placeholder data
    if (conversationId) {
      return NextResponse.json({
        id: conversationId,
        userId,
        title: 'Sample Conversation',
        modelUsed: 'llama-3.1-8b',
        totalMessages: 4,
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 3600000,
        messages: [
          {
            id: 'msg-1',
            conversationId,
            role: 'user',
            content: 'Hello, can you help me create content?',
            tokensUsed: 12,
            responseTime: 250,
            createdAt: Date.now() - 3600000
          },
          {
            id: 'msg-2',
            conversationId,
            role: 'assistant',
            content: 'Of course! I can help you create various types of content including blog posts, social media content, marketing copy, and more. What type of content would you like to create?',
            tokensUsed: 45,
            responseTime: 1200,
            createdAt: Date.now() - 3500000
          }
        ]
      });
    } else {
      return NextResponse.json([
        {
          id: 'conv-1',
          userId,
          title: 'Content Creation Chat',
          modelUsed: 'llama-3.1-8b',
          totalMessages: 8,
          createdAt: Date.now() - 86400000,
          updatedAt: Date.now() - 3600000
        },
        {
          id: 'conv-2',
          userId,
          title: 'Marketing Copy Review',
          modelUsed: 'llama-3.1-8b',
          totalMessages: 6,
          createdAt: Date.now() - 172800000,
          updatedAt: Date.now() - 7200000
        }
      ]);
    }
  } catch (error) {
    console.error('Chat History API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve chat history' },
      { status: 500 }
    );
  }
}
