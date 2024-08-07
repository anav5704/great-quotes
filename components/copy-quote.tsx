"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CopyQuoteProps {
    content: string
    author: string
}

export const CopyQuote = ({ content, author }: CopyQuoteProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(content + " - " + author)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <button
            aria-label="Copy quote"
            onClick={handleCopy}
            className="grid place-content-center"
        >
            {copied ?
                <Check
                    role="img"
                    aria-label="Check"
                    size={20}
                />
                :
                <Copy
                    role="img"
                    aria-label="Copy"
                    size={20}
                />
            }
        </button>
    )
}
