"use server";

import { YouTubeSettings } from "@/lib/settings";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    ideas: {
      type: SchemaType.ARRAY,
      description: "List of video ideas",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.NUMBER,
            description: "Unique identifier for the idea",
          },
          text: {
            type: SchemaType.STRING,
            description: "The video idea title",
          },
          completed: {
            type: SchemaType.BOOLEAN,
            description: "Whether the idea has been completed",
          },
          score: {
            type: SchemaType.NUMBER,
            description:
              "a number between 0 and 100 indicating the relevance of the idea",
          },
        },
        required: ["id", "text", "completed"],
      },
    },
  },
  required: ["ideas"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export async function getIdeas() {
  const result = await model.generateContent(
    `Generate YouTube video ideas for a ${
      YouTubeSettings.channelType
    } channel about:  ${YouTubeSettings.channelTags.join(", ")}
        Channel focus: ${YouTubeSettings.channelTags.join(", ")}
        
        Make the ideas engaging and optimized for YouTube search. Include trending topics and keyword-rich`
  );

  // console.log(result.response.text());

  return JSON.parse(result.response.text());
}

export async function getMocupIdeas({ topic }) {
 
  const result = await model.generateContent(
    `Generate YouTube video ideas for a ${YouTubeSettings.channelType} channel topic:  ${topic}
        
        Make the ideas engaging and optimized for YouTube search. Include trending topics and keyword-rich`
  );

  // console.log(result.response.text());

  return JSON.parse(result.response.text());
}
