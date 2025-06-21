"use server";

export async function generateOutline(topic, content) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: 'content',
        topic: topic,
        content: content,
        settings: {
          type: 'outline',
          format: 'json'
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate outline');
    }

    const data = await response.json();
    
    // Try to parse the content as JSON if it's a string
    if (typeof data.content === 'string') {
      try {
        return JSON.parse(data.content);
      } catch {
        // If parsing fails, return a structured format
        return {
          sections: [
            {
              title: "Generated Outline",
              points: data.content.split('\n').filter(line => line.trim())
            }
          ]
        };
      }
    }
    
    return data.content || data;
  } catch (error) {
    console.error("Error generating outline:", error);
    throw new Error("Failed to generate outline");
  }
}
