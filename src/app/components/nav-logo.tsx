"use client"

import { useRouter } from "next/navigation"

export const NavLogo = () => {
    const router = useRouter()

    return (
        <h3 className="text-lg cursor-pointer" onClick={() => router.push("/")}>
            Great Quotes
        </h3>
    )
}
