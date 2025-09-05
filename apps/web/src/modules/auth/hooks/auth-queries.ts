import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '@/modules/auth/config/auth-client'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT , DEFAULT_LOGOUT_REDIRECT } from '@/routes'




export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
}


export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      try {
        const session = await authClient.getSession()
        return session?.data 
      } catch (error) {
        console.error('Session fetch error:', error)
        return null
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  })
}

export function useUser() {
  const { data: session, ...rest } = useSession()
  return {
    data: session?.user,
    ...rest,
  }
}

export function useAuth() {
  const { data: session, isLoading, error } = useSession()
  
  return {
    user: session?.user,
    session: session?.session || null,
    isAuthenticated: !!session?.user,
    isLoading,
    error,
  }
}


export function useSignOut() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await authClient.signOut()
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all })

      router.push(DEFAULT_LOGOUT_REDIRECT)
    },
    onError: (error) => {
      console.error('Sign out error:', error)
      router.push(DEFAULT_LOGOUT_REDIRECT)
    },
  })
}


export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ 
      provider, 
      callbackUrl 
    }: { 
      provider: 'google' | 'github'
      callbackUrl: string 
    }) => {
      return await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      })
    },
    onSuccess: () => {
      // Invalidate and refetch session data
      queryClient.invalidateQueries({ queryKey: authKeys.session() })
    },
    onError: (error) => {
      console.error('Sign in error:', error)
    },
  })
}