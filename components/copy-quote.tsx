"use client"

import { useOrigin } from "@/hooks/use-origin"
import { Link, Check } from "lucide-react"
import { useState } from "react"

interface CopyQuoteProps {
    id: string
}

export const CopyQuote = ({ id }: CopyQuoteProps) => {
    const [copied, setCopied] = useState(false)
    const origin = useOrigin()

    const handleCopy = () => {
        navigator.clipboard.writeText(origin + "/quotes/" + id)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <button
            onClick={handleCopy}
            className="grid place-content-center p-5 opacity-0 group-hover:opacity-100 transition"
        >
            {copied ? <Check size={20} /> : <Link size={20} />}
        </button>
    )
}
