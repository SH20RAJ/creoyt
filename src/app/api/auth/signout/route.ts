import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

/**
 * POST /api/auth/signout
 * Signs out the current user and redirects to home page
 */
export async function POST(request: NextRequest) {
  try {
    // Sign out the user using Stack Auth
    const response = await stackServerApp.signOut();
    
    // Redirect to home page after signout
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error signing out:', error);
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/signout
 * Alternative endpoint for GET requests (redirect-based signout)
 */
export async function GET(request: NextRequest) {
  try {
    // Sign out the user using Stack Auth
    await stackServerApp.signOut();
    
    // Redirect to home page after signout
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error signing out:', error);
    // Even if there's an error, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}