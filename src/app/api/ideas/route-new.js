import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/database';
import { getAIService } from '@/lib/cloudflare-ai';
import { NextResponse } from "next/server";

// Force dynamic runtime to prevent static generation
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req, env) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { topic, settings } = await req.json();

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Get AI service with Cloudflare AI binding
    const aiService = getAIService(env);
    
    // Generate ideas using Llama 3
    const result = await aiService.generateIdeas(topic, settings);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to generate ideas' },
        { status: 500 }
      );
    }

    // Save ideas to database
    const savedIdeas = [];
    for (const idea of result.ideas) {
      try {
        const ideaData = {
          id: crypto.randomUUID(),
          title: idea.title || `${topic} Idea`,
          description: idea.description || 'AI-generated business idea',
          content: JSON.stringify(idea),
          userId: userId,
          tags: JSON.stringify([topic, idea.category].filter(Boolean)),
          category: 'generated',
          status: 'draft'
        };

        const savedIdea = await db.createIdea(ideaData);
        savedIdeas.push(savedIdea);
      } catch (dbError) {
        console.error('Database error saving idea:', dbError);
        // Continue with other ideas even if one fails
      }
    }

    return NextResponse.json({
      ideas: result.ideas,
      savedIdeas,
      model: result.model,
      usage: result.usage
    });

  } catch (error) {
    console.error('Error in ideas API:', error);
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const ideas = await db.getIdeasByUserId(userId);
    
    return NextResponse.json({
      ideas: ideas || []
    });

  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}
