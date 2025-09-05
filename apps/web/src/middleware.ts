import { NextRequest, NextResponse } from 'next/server'
import { 
  publicRoutes, 
  protectedRoutes, 
  authRoutes, 
  apiAuthPrefix, 
  DEFAULT_LOGIN_REDIRECT 
} from '@/routes'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken = request.cookies.get('better-auth.session_token')?.value
  const isLoggedIn = !!sessionToken


  const isApiAuthRoute = apiAuthPrefix && pathname.startsWith(apiAuthPrefix)
  
  
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isApiAuthRoute) {
    return NextResponse.next()
  }


  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  }

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {

  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};