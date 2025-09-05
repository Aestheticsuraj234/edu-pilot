

export interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null
}

export interface Session {
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
  ipAddress?: string | null
  userAgent?: string | null
}


export interface SessionResponse {
  user: User
  session: Session
}
