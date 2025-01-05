"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateOutline(topic, content) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `Create a detailed video outline for: ${topic}
    Additional context: ${content}
    
    Format the response as JSON with this structure:
    {
      "sections": [
        {
          "title": "section name",
          "points": ["point 1", "point 2"]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error generating outline:", error);
    throw new Error("Failed to generate outline");
  }
}
