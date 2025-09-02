
import {betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./lib/db.ts";



export const auth = betterAuth({
    database:prismaAdapter(db , {provider:"postgresql"}),
    socialProviders:{
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            accessType:"offline",
            prompt:"consent"
        },
        github:{
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        }
    }
})