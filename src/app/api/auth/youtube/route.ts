import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { youTubeAPI } from '@/lib/youtube';

/**
 * GET /api/auth/youtube
 * Initiates YouTube OAuth flow by redirecting user to Google's authorization server
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated with Stack Auth
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in first' },
        { status: 401 }
      );
    }

    // Generate state parameter for security (includes user ID)
    const state = JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
    });

    // Get YouTube OAuth URL
    const authUrl = youTubeAPI.getAuthUrl(Buffer.from(state).toString('base64'));

    // Redirect user to Google OAuth
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('YouTube OAuth initiation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initiate YouTube authentication',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}