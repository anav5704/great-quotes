"use client"

import { useEffect, useState } from "react"
import { QuoteModal } from "@/components/quote-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return

    return (
        <QuoteModal />
    )
} 