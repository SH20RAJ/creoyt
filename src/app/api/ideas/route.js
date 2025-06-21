import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/database';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { topic, settings } = await req.json();

    const prompt = `
      Generate creative content ideas for: ${topic}
      Focus areas: ${settings?.channelTags?.join(", ") || "general content"}
      
      Please return a JSON object with the following structure:
      {
        "title": "Main idea title",
        "description": "Detailed description of the content idea",
        "tags": ["tag1", "tag2", "tag3"]
      }
      
      Make the ideas engaging and optimized for content creation.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let ideaData;
    try {
      ideaData = JSON.parse(text);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      ideaData = {
        title: `Ideas for: ${topic}`,
        description: text,
        tags: [topic]
      };
    }

    // Save to database
    const savedIdea = await db.createIdea({
      id: crypto.randomUUID(),
      title: ideaData.title,
      description: ideaData.description,
      content: text,
      userId: userId,
      tags: JSON.stringify(ideaData.tags || []),
      category: 'generated',
      status: 'draft'
    });

    return NextResponse.json({
      ...ideaData,
      id: savedIdea.id
    });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const ideas = await db.getIdeasByUserId(userId);

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}
