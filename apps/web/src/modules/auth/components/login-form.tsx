"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { useSignIn } from "../hooks/auth-queries"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useState } from 'react'

export function LoginForm() {
  const { mutateAsync, isPending } = useSignIn()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      setLoadingProvider(provider)
      await mutateAsync({ 
        provider, 
        callbackUrl: DEFAULT_LOGIN_REDIRECT || process.env.NEXT_PUBLIC_APP_URL!
      })
    } catch (error) {
      console.error(`${provider} sign in failed:`, error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-muted-foreground">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleSignIn('google')} 
            className="h-12 font-medium"
            disabled={isPending}
          >
            {loadingProvider === 'google' ? (
              <div className="h-5 w-5 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Mail className="h-5 w-5 mr-2" />
            )}
            Continue with Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSignIn('github')} 
            className="h-12 font-medium"
            disabled={isPending}
          >
            {loadingProvider === 'github' ? (
              <div className="h-5 w-5 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Github className="h-5 w-5 mr-2" />
            )}
            Continue with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
