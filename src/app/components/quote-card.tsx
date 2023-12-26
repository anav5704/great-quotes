"use client"

import { Card, CardBody } from "@nextui-org/react"
import { Quote, User } from "@prisma/client"
import { useModal } from "~/app/hooks/use-modal"

interface QuoteCardProps {
    quote: Quote & {
        user: User
    }
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
    const { onOpen } = useModal()

    return (
        <Card className="dark">
            <CardBody>
                <div>
                    <p className="text-lg mb-3">
                        "{quote.content}"
                    </p>
                    <p className=" text-zinc-500 text-right w-full">
                        {quote.user.name}
                    </p>
                    <div className="flex items-center gap-x-3 text-zinc-500 justify-end w-full">
                        <p className="cursor-pointer" onClick={() => onOpen("update", { content: quote.content, id: quote.id })}>Update</p>
                        <p className="cursor-pointer" onClick={() => { }}>Delete</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
