import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/signout
 * Signs out the current user by clearing all auth-related cookies
 */
export async function POST(request: NextRequest) {
  try {
    const acceptHeader = request.headers.get('accept') || '';
    const isJsonRequest = acceptHeader.includes('application/json');
    
    // Clear all possible Stack Auth cookies
    const cookieNames = [
      'stack-session',
      'stack-auth-session', 
      'stack-token',
      '__Secure-next-auth.session-token',
      'next-auth.session-token'
    ];
    
    if (isJsonRequest) {
      // For AJAX requests, return JSON response
      const response = NextResponse.json({ success: true, message: 'Signed out successfully' });
      
      cookieNames.forEach(cookieName => {
        response.cookies.set(cookieName, '', {
          expires: new Date(0),
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
      });
      
      return response;
    } else {
      // For regular requests, redirect to home
      const response = NextResponse.redirect(new URL('/', request.url));
      
      cookieNames.forEach(cookieName => {
        response.cookies.set(cookieName, '', {
          expires: new Date(0),
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
      });
      
      return response;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    
    // Still clear cookies and respond appropriately even on error
    const acceptHeader = request.headers.get('accept') || '';
    const isJsonRequest = acceptHeader.includes('application/json');
    
    if (isJsonRequest) {
      const response = NextResponse.json({ success: true, message: 'Signed out' });
      response.cookies.set('stack-session', '', { expires: new Date(0), path: '/' });
      return response;
    } else {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('stack-session', '', { expires: new Date(0), path: '/' });
      return response;
    }
  }
}

/**
 * GET /api/auth/signout
 * Alternative endpoint for GET requests (redirect-based signout)
 */
export async function GET(request: NextRequest) {
  return POST(request);
}