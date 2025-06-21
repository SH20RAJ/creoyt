import { db } from '@/lib/database';
import { NextResponse } from 'next/server';

// Force dynamic runtime to prevent static generation
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const entry = await db.addToWaitlist(email, name);

    return NextResponse.json({
      message: 'Successfully added to waitlist',
      entry,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}

export const GET = () => {
  return new Response("Waitlist API endpoint", {
    headers: {
      "content-type": "text/plain",
    },
  });
};