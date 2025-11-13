import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    try {
      const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
      if (!user) {
        // Redirect to sign-in if not authenticated
        return NextResponse.redirect(new URL('/handler/sign-in', request.url));
      }
    } catch (_error) {
      // If there's an error getting the user, redirect to sign-in
      return NextResponse.redirect(new URL('/handler/sign-in', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
