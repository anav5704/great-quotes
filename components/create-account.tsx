"use client"

import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { Google } from "../public/icons/google"

export const CreateAccount = () => {
    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={<Google />}
            onPress={() => signIn("google")}
        >
            Create Account
        </Button>
    )
}
