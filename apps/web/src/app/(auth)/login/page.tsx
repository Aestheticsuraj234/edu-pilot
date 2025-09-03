"use client"

import { authClient } from "@/modules/auth/config/auth-client"
import { useSearchParams } from "next/navigation"



export default function LoginPage() {
  const params = useSearchParams()
  const next = params.get("next") || "/dashboard"

  const handleSignIn = async (provider: "google" | "github") => {
    console.log("Signing in with", provider)

    const res = await authClient.signIn.social({
      provider: provider,
    })

    console.log("Response:", res)
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign in</h1>
        <div className="space-y-3">
          <button
            onClick={() => handleSignIn("google")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-zinc-100 text-zinc-900 px-4 py-2 font-medium hover:bg-zinc-200 transition"
          >
            {" "}
            {/* using a text label instead of image/icon for simplicity */}
            Continue with Google
          </button>
          <button
            onClick={() => handleSignIn("github")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 text-zinc-100 border border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-800 transition"
          >
            Continue with GitHub
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-zinc-500">
          You will be redirected to the provider and brought back here.
        </p>
      </div>
    </div>
  )
}
