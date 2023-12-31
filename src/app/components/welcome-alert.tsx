"use client"

import { signIn } from "next-auth/react"

export const WelcomeAlert = () => {
    return (
        <div onClick={() => signIn()} className="cursor-pointer w-fit mt-10 mx-auto p-2 bg-white items-center leading-none rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-zinc-300 text-zinc-800 px-2 uppercase py-1 text-xs font-bold mr-3">Welcome!</span>
            <span className="font-semibold mr-2 text-left flex-auto">Please sign in to continue</span>
            <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
        </div>
    )
}
