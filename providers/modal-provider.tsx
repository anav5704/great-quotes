"use client"

import { useEffect, useState } from "react"
import { CreateQuote } from "@/components"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return

    return (
        <CreateQuote />
    )
} 