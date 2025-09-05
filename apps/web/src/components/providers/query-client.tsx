"use client"

import { useSession } from "@/modules/auth/hooks/auth-queries"
import { useAuthStore } from "@/modules/auth/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useEffect, useState } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: any) => {
              if (error?.status === 401 || error?.status === 403) {
                return false
              }
              return failureCount < 3
            },
            refetchOnWindowFocus: true,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSync>{children}</AuthSync>
    </QueryClientProvider>
  )
}


function AuthSync({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const { setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    if (session?.user) {
      setAuth(session.user, session.session)
    } else {
      clearAuth()
    }
  }, [session, setAuth, clearAuth])

  return <>{children}</>
}
