"use client"

import { Heart, PenLine, MoreVertical, Trash } from "lucide-react"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Like, Quote, User } from "@prisma/client"
import { useModal } from "~/app/hooks/use-modal"
import { currentUser } from "../lib/currentUser"
import { LikeButton } from "./like-button"
import Cryptr from "cryptr"
import { use, useEffect, useState } from "react"

interface QuoteCardProps {
    quote: Quote & {
        user: User,
        likes: Like[]
    },
    currentUser: User | null | undefined
}

export const QuoteCard = ({ quote, currentUser }: QuoteCardProps) => {
    useEffect(() => {
        const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR!)
        const decryptedQuote = cryptr.decrypt(quote.content)
        setDecryptedQuote(decryptedQuote)
    }, [quote])
    
    const [decryptedQuote, setDecryptedQuote] = useState<string>("")
    const isLiked = quote.likes.some((like) => like.userId === currentUser?.id)
    const { onOpen } = useModal()

    return (
        <Card className="dark">
            <CardBody className="group">
                <div>
                    <p className="text-xl mb-5 italic">
                        "{decryptedQuote}"
                    </p>
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-x-3">
                            {quote.userId === currentUser?.id && ( 
                            <Dropdown className="dark text-white mt-6" backdrop="blur">
                                <DropdownTrigger>
                                    <Button isIconOnly className="opacity-0 group-hover:opacity-100 transition">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem onClick={() => onOpen("update", { content: decryptedQuote, id: quote.id })} key="edit">
                                        <div className="flex items-center justify-between p-1">
                                            Edit Quote
                                            <PenLine className="h-5 w-5" />
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem onClick={() => onOpen("delete", { id: quote.id })} key="delete" className="text-danger" color="danger">
                                        <div className="flex items-center justify-between p-1">
                                            Delete Quote
                                            <Trash className="h-5 w-5" />
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            )}
                            <LikeButton quoteId={quote.id} isLiked={isLiked} likeCount={quote.likes.length}/>
                        </div>
                        <p className=" text-zinc-500">
                            - {quote.user.name}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
