"use client"

import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { Plus } from "lucide-react"
import { useModal } from "@/hooks/use-modal"

export const AddQuote = () => {
    const { onOpen } = useModal(

    )
    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={<Plus size={20} strokeWidth={2.5} />}
            onPress={() => onOpen("createQuote")}
        >
            Add Quote
        </Button>
    )
}
