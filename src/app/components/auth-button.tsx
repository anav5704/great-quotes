"use client"

import { Session } from "node_modules/next-auth/core/types"
import { Button, ButtonGroup } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"

interface AuthButtonProps {
    session: Session | null
}

export const AuthButton = ({ session }: AuthButtonProps) => {
    return (
        <div className="flex items-center gap-x-5">
            {session ? (
                <Button className="px-6 text-black" radius="full" size="sm" color="primary" variant="flat" onClick={() => signOut()}>Log out</Button>
            ) : (
                <Button className="px-6 text-black" radius="full" size="sm" color="primary" variant="solid" onClick={() =>signIn()}>Log In</Button>
            )}
            {session && <Image src={session?.user?.image ?? ""} alt={`Profile image for ${session?.user?.name}`} height={35} width={35} className="rounded-full" />}
        </div>
    )
}
