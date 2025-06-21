import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { log } from "console";
import { NextResponse } from "next/server";

// Force dynamic runtime to prevent static generation
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.ARRAY,
      description: "Catchy 5 titles for the YouTube video",
      nullable: false,
      items: {
        type: SchemaType.STRING,
      },
    },
    description: {
      type: SchemaType.STRING,
      description: "Engaging description for the video 1k chars",
      nullable: false,
    },
    tags: {
      type: SchemaType.ARRAY,
      description:
        "Relevant tags for better discoverability with youtube limit apx 500 chars",
      items: {
        type: SchemaType.STRING,
      },
    },
  },
  required: ["title", "description", "tags"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  const result = await model.generateContent(
    `Generate a YouTube video topic recommendation for video about: ${title}`
  );

  return NextResponse.json(JSON.parse(result.response.text()));
}
