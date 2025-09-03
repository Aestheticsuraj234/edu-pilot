import Link from "next/link"

export default async function HomePage() {


  return (
    <div className="container py-12">
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-balance">Better Auth OAuth with Google & GitHub</h1>
        <p className="text-zinc-400">
          A monorepo with an Express API using Prisma and Better Auth, and a Next.js frontend using a dark zinc theme.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            className="rounded-md bg-teal-500 text-zinc-950 px-4 py-2 font-medium hover:bg-teal-400 transition"
            href="/login"
          >
            Sign in
          </Link>
          <Link
            className="rounded-md border border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-900 transition"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}