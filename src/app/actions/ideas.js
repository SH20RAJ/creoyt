"use server";

import { YouTubeSettings } from "@/lib/settings";

export async function getIdeas() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: 'ideas',
        topic: `${YouTubeSettings.channelType} channel about: ${YouTubeSettings.channelTags.join(", ")}`,
        settings: {
          channelType: YouTubeSettings.channelType,
          channelTags: YouTubeSettings.channelTags,
          focusAreas: YouTubeSettings.channelTags,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate ideas');
    }

    const data = await response.json();
    return data.ideas || [];
  } catch (error) {
    console.error('Error generating ideas:', error);
    return [];
  }
}

export async function getMocupIdeas({ topic }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: 'ideas',
        topic: topic,
        settings: {
          channelType: YouTubeSettings.channelType,
          channelTags: YouTubeSettings.channelTags,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate ideas');
    }

    const data = await response.json();
    return data.ideas || [];
  } catch (error) {
    console.error('Error generating ideas:', error);
    return [];
  }
}
