/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
    "/",
]

/**
 * An Array of routes that are protected
 * These routes require authentication
 * @type {string[]}
 */

export const protectedRoutes: string[] = [
   
    
]

/**
 * An Array of routes that are accessible to the public
 * Routes that start with this (/api/auth) prefix do not require authentication
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/login",   // Added leading slash
   
]

/**
 * An Array of routes that are accessible to the public
 * Routes that start with this (/api/auth) prefix do not require authentication
 * @type {string}
 */

export const apiAuthPrefix: string = ""

export const DEFAULT_LOGIN_REDIRECT = process.env.NEXT_PUBLIC_APP_URL; // Changed to redirect to home page after login

export const DEFAULT_LOGOUT_REDIRECT = `${process.env.NEXT_PUBLIC_APP_URL}/login`;