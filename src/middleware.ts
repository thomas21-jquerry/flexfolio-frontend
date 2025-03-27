import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Create middleware client
  const supabase = createMiddlewareClient({ req: request, res })

  // Check auth state
  const { data: { session } } = await supabase.auth.getSession()

  // Get the current origin for dynamic redirects
  const origin = request.nextUrl.origin
  const url = request.nextUrl

  // Redirect unauthenticated users away from /flights
  if (!session && url.pathname.startsWith('/flights')) {
    return NextResponse.redirect(new URL('/auth/login', origin))
  }

  // Prevent authenticated users from accessing /auth pages
  if (session && url.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', origin))
  }

  return res
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/user/:path*', '/auth/:path*']
}