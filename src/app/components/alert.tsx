"use client"

import { signIn } from "next-auth/react"

interface AlertProps {
    redirect?: boolean,
    title: string,
    message: string
}

export const Alert = ({ redirect, title, message }: AlertProps) => {
    return (
        <div onClick={() => redirect && signIn("google")} className={`${redirect && "cursor-pointer"} w-fit mt-10 mx-auto p-2 bg-white items-center leading-none rounded-full flex lg:inline-flex`} role="alert">
            <span className="flex rounded-full bg-zinc-300 text-zinc-800 px-2 uppercase py-1 text-xs font-bold mr-3">{title}</span>
            <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
        </div>
    )
}
