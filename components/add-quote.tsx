"use client"

import { useModal } from "@/hooks/use-modal"
import { Button } from "@nextui-org/button"
import { Plus } from "lucide-react"

export const AddQuote = () => {
    const { onOpen } = useModal()

    return (
        <Button
            size="lg"
            radius="lg"
            className="text-lg"
            endContent={
                <Plus
                    size={20}
                    strokeWidth={2.5}
                    data-testid="plus-icon"
                />
            }
            onPress={() => onOpen("createQuote")}
        >
            Add Quote
        </Button>
    )
}
