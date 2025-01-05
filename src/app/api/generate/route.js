import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response("API key not configured", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fix: Correct format for Gemini API request
    const stream = await model.generateContentStream(prompt );

    // Create a TransformStream for streaming responses
    const encoder = new TextEncoder();
    
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked"
      },
    });
    
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
