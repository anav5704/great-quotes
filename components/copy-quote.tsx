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
            onClick={handleCopy}
            className="grid place-content-center"
        >
            {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
    )
}
