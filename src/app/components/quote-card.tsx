"use client"

import { Button, Card, CardBody } from "@nextui-org/react"
import { Like, Quote, User } from "@prisma/client"
import { Heart } from "lucide-react"
import { useModal } from "~/app/hooks/use-modal"
import { LikeButton } from "./like-button"
import { currentUser } from "../lib/currentUser"

interface QuoteCardProps {
    quote: Quote & {
        user: User,
        likes: Like[]
    },
    currentUser: User | null | undefined
}

export const QuoteCard = ({ quote, currentUser }: QuoteCardProps) => {
    const { onOpen } = useModal()

    const isLiked = quote.likes.some((like) => like.userId === currentUser?.id)

    return (
        <Card className="dark">
            <CardBody>
                <div>
                    <p className="text-lg mb-3">
                        "{quote.content}"
                    </p>
                    <LikeButton quoteId={quote.id} isLiked={isLiked} />
                    <p className=" text-zinc-500 text-right w-full">
                        {quote.user.name}
                    </p>
                    <div className="flex items-center gap-x-3 text-zinc-500 justify-end w-full">
                        <p className="cursor-pointer" onClick={() => onOpen("update", { content: quote.content, id: quote.id })}>Update</p>
                        <p className="cursor-pointer" onClick={() => onOpen("delete", { id: quote.id })}>Delete</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
