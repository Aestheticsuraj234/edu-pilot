import { useEffect } from "react"
import { useAuthStore } from "../store"
import { useSession } from "./auth-queries"

export function useAuth() {
  const { data: session, isLoading, error } = useSession()
  const { setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    if (session?.data?.user) {
      setAuth(session.data.user, session.data.session)
    } else {
      clearAuth()
    }
  }, [session, setAuth, clearAuth])

  return {
    user: session?.data?.user,
    session: session?.data?.session || null,
    isAuthenticated: !!session?.data?.user,
    isLoading,
    error,
  }
}
