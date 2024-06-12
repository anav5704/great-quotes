"use client"

import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { Plus } from "lucide-react"

interface AddQuoteProps {
    user: boolean
}

export const AddQuote = ({ user }: AddQuoteProps) => {
    const handleClick = () => {
        user ? signIn("apple") : signIn("google")
    }

    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={<Plus size={20} strokeWidth={2.5} />}
            onPress={handleClick}
        >
            Add Quote
        </Button>
    )
}
