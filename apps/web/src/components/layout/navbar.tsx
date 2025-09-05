"use client"
import { Button } from "@/components/ui/button"



import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "../theme-toggle"
import { UserButton } from "@/modules/auth/components/user-button"
import { useAuth, useSignOut } from "@/modules/auth/hooks/auth-queries"

export const Navbar = () => {

  const { isAuthenticated, isLoading, user } = useAuth()

  const { mutate: signOut } = useSignOut()

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="EduPilot" width={42} height={42} />
            <span className="font-bold text-2xl tracking-widest text-primary">EduPilot</span>
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <UserButton
              user={user}
              onSignOut={signOut}
              showDropdown
              showName={false}
             
            />




          </div>
        </div>
      </div>
    </nav>
  )
}