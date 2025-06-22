import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { youtubeChannels } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

// GET all YouTube channels for a user or all channels
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const db = getDB();
    
    let channels;
    if (userId) {
      channels = await db.select()
        .from(youtubeChannels)
        .where(eq(youtubeChannels.userId, userId))
        .orderBy(desc(youtubeChannels.createdAt));
    } else {
      channels = await db.select()
        .from(youtubeChannels)
        .orderBy(desc(youtubeChannels.createdAt));
    }
    
    return NextResponse.json(channels);
  } catch (error) {
    console.error("Error fetching YouTube channels:", error);
    return NextResponse.json({ error: "Failed to fetch YouTube channels" }, { status: 500 });
  }
}

// POST new YouTube channel
export async function POST(request) {
  try {
    const { 
      userId, 
      channelId, 
      channelName, 
      channelUrl, 
      subscriberCount, 
      videoCount, 
      viewCount, 
      channelDescription, 
      channelThumbnail 
    } = await request.json();

    if (!userId || !channelId || !channelName || !channelUrl) {
      return NextResponse.json({ 
        error: "userId, channelId, channelName, and channelUrl are required" 
      }, { status: 400 });
    }

    const db = getDB();
    
    // Check if channel already exists
    const existingChannel = await db.select()
      .from(youtubeChannels)
      .where(eq(youtubeChannels.channelId, channelId))
      .limit(1);
    
    if (existingChannel.length > 0) {
      // Update existing channel
      const updatedChannel = await db.update(youtubeChannels)
        .set({
          channelName,
          channelUrl,
          subscriberCount,
          videoCount,
          viewCount,
          channelDescription,
          channelThumbnail,
          updatedAt: new Date()
        })
        .where(eq(youtubeChannels.channelId, channelId))
        .returning();
        
      return NextResponse.json(updatedChannel[0]);
    } else {
      // Create new channel
      const newChannel = await db.insert(youtubeChannels).values({
        userId,
        channelId,
        channelName,
        channelUrl,
        subscriberCount,
        videoCount,
        viewCount,
        channelDescription,
        channelThumbnail,
      }).returning();

      return NextResponse.json(newChannel[0], { status: 201 });
    }
  } catch (error) {
    console.error("Error creating/updating YouTube channel:", error);
    return NextResponse.json({ error: "Failed to create/update YouTube channel" }, { status: 500 });
  }
}
