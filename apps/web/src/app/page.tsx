"use client"
import { Button } from "@/components/ui/button"
import { useAuth, useSignOut } from "@/modules/auth/hooks/auth-queries"
import Link from "next/link"

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { mutate: signOut, isPending: isSigningOut } = useSignOut()

  const handleSignOut = () => {
    signOut()
  }

  
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <div className="h-8 bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-10 w-20 bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-zinc-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-balance">
          Better Auth OAuth with Google & GitHub
        </h1>
        <p className="text-zinc-400">
          A monorepo with an Express API using Prisma and Better Auth, and a Next.js frontend using a dark zinc theme.
        </p>
        
        {/* Show welcome message if authenticated */}
        {isAuthenticated && user && (
          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-sm text-zinc-300">
              Welcome back, <span className="font-medium text-zinc-100">{user.name || user.email}</span>!
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            // Show authenticated user options
            <>
              <Link
                className="rounded-md border border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-900 transition"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Button 
                onClick={handleSignOut} 
                variant="outline"
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                    Signing out...
                  </>
                ) : (
                  'Sign out'
                )}
              </Button>
            </>
          ) : (
            // Show unauthenticated user options
            <>
              <Link
                className="rounded-md bg-teal-500 text-zinc-950 px-4 py-2 font-medium hover:bg-teal-400 transition"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="rounded-md border border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-900 transition opacity-50 cursor-not-allowed"
                href="/login"
                title="Please sign in to access dashboard"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}