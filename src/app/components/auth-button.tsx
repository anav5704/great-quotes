"use client"

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { Session } from "node_modules/next-auth/core/types"

interface AuthButtonProps {
    session: Session | null
}

export const AuthButton = ({ session }: AuthButtonProps) => {
    return (
        <div className="flex items-center gap-x-5">
            <button onClick={() => session ? signOut() : signIn()}>{session ? "Log out" : "Log In"}</button>
            {session && <Image src={session?.user?.image ?? ""} alt={`Profile image for ${session?.user?.name}`} height={35} width={35} className="rounded-full" />}
        </div>
    )
}
