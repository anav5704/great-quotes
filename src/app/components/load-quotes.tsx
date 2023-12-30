"use client"

import { useInView } from "react-intersection-observer"
import { Like, Quote, User } from "@prisma/client"
import { Card, Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { QuoteCard } from "./quote-card"
import { api } from "~/trpc/react"

let page = 1
const cards = [1, 2, 3]

interface LoadQuotesProps {
    user: User,
    type: "all" | "liked" | "user"
}

export const LoadQuotes = ({ user, type }: LoadQuotesProps) => {
    const { refetch: refetchAll } = api.quote.getQuotes.useQuery({ page })
    const { refetch: refetchLiked } = api.quote.getLikedQuotes.useQuery({ userId: user.id, page })
    const { refetch: refetchUser } = api.quote.getQuoteByUserId.useQuery({ id: user.id, page })
    const { ref, inView } = useInView()
    const [loadedAll, setLoadedAll] = useState<boolean>(false)
    const [quotes, setQuotes] = useState<(Quote & {
        user: User,
        likes: Like[]
    })[]>([])

    useEffect(() => {
        const fetchQuotes = async () => {
            const fetch = type === "all" ? refetchAll : type === "liked" ? refetchLiked : refetchUser
            const { data } = await fetch()

            if (data && data?.length < 6) setLoadedAll(true)

            setQuotes((prev) => [...prev, ...(data) ?? []])
            page++
        }

        if (inView && !loadedAll) void fetchQuotes()
    }, [inView])

    return (
        <>
            {quotes.length > 0 && (
                <main className="grid grid-cols-1 md:grid-cols-3 mx-auto md:w-3/4 w-4/5 gap-10 pb-10">
                    {quotes.map((quote) => (
                        <QuoteCard key={quote.id} quote={quote} currentUser={user} />
                    ))}
                </main>)}
            {!loadedAll && (
                <div ref={ref} className="dark grid grid-cols-1 md:grid-cols-3 w-4/5  md:w-3/4  mx-auto gap-10 pb-10">
                    {cards.map(((card) => (
                        <Card className="space-y-5 p-4 col-span-1" radius="lg">
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="flex justify-end">
                                <Skeleton className="w-2/5 rounded-lg mt-2">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    )))}
                </div>)}
        </>
    )
}
