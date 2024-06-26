"use client"

import { Google } from "../public/icons/google"
import { Button } from "@nextui-org/button"
import { signIn } from "next-auth/react"
import { useState } from "react"

export const CreateAccount = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={<Google />}
            isDisabled={isLoading}
            onPress={() => {
                setIsLoading(true)
                signIn("google")
            }}
        >
            Create Account
        </Button>
    )
}
