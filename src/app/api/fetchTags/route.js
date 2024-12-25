// app/api/fetchTags/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { topic } = await req.json();

  try {
    const response = await fetch(
      `https://creoyt-tagsgen.shraj.workers.dev/?query=${encodeURIComponent(
        topic
      )}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error("Failed to fetch tags");
  }
}
