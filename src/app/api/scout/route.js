import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YouTubeSettings } from "@/lib/settings";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message, context } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `You are CreoYT AI Assistant, an expert in YouTube growth and content strategy.

    Users YouTube channel details in JSON Format: 
    ${YouTubeSettings}

Previous conversation:
${context}

Current query: ${message}

Please provide helpful advice for the current query. Keep responses concise and actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({
      content: response.text(),
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.error({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
