
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/api/auth`,
   fetchOptions: {
    credentials: "include", // 👈 send cookies
  },
})
