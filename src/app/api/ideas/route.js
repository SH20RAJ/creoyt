import { YouTubeSettings } from "@/lib/settings";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { log } from "console";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


 
export async function POST(req) {
  try {
    const { topic, settings } = await req.json();

    const prompt = `
      Generate YouTube video ideas for a ${settings.channelType} channel about: ${topic}
      Channel focus: ${settings.channelTags.join(', ')}
      
      Make the ideas engaging and optimized for YouTube search. Include trending topics and keyword-rich titles.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
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
    
    return NextResponse.json({
      title: JSON.parse(text).title,
      description: JSON.parse(text).description, 
      tags: JSON.parse(text).tags
    });

  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.error();
  }
}