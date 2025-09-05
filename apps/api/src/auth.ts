import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db.js";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: "offline",
      prompt: "consent",
      
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      
    },
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  ],
  cookies: {
    sameSite: "lax", // use "none" if frontend/backend are on different domains
    secure: false, // must be true in production (https)
  },

});
