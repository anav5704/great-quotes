"use client"

import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { Google } from '@/public/icons/google'

export const SignIn = () => {
    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={<Google />}
            onPress={() => signIn("google")}
        >
            Create Free Account
        </Button>
    )
}
