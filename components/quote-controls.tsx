"use client"

import { CopyQuote } from "@/components/copy-quote"
import { Pen, PenBox, Trash2 } from "lucide-react"
import { useModal } from "@/hooks/use-modal"
import { Quote, User } from "@/types"


interface QuoteControlsProps {
    quote: Quote & {
        User: User
    },
    userId: string
}

export const QuoteControls = ({ quote, userId }: QuoteControlsProps) => {
    const { onOpen } = useModal()

    return (
        <div
            data-testid="quote-controls"
            className="flex items-center gap-5 p-5 opacity-102170 group-hover:opacity-100 transition"
        >
            <CopyQuote
                content={quote.content}
                author={quote.User.name}
            />
            {userId == quote.User.id && (
                <>
                    <button
                        aria-label="Update quote"
                        data-test="update-quote"
                        onClick={() => onOpen("updateQuote", quote)}
                    >
                        <PenBox size={20} />
                    </button>
                    <button
                        aria-label="Delete quote"
                        data-test="delete-quote"
                        onClick={() => onOpen("deleteQuote", quote)}
                    >
                        <Trash2 size={20} />
                    </button>
                </>
            )}
        </div>
    )
}
