"use client"

import { Heart, MoreVertical, PenLine, Settings, Trash } from "lucide-react"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Like, Quote, User } from "@prisma/client"
import { useModal } from "~/app/hooks/use-modal"
import { currentUser } from "../lib/currentUser"
import { LikeButton } from "./like-button"

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
            <CardBody className="group">
                <div>
                    <p className="text-xl mb-5 italic">
                        "{quote.content}"
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            {quote.userId === currentUser?.id && ( 
                            <Dropdown className="dark text-white mt-6" backdrop="blur">
                                <DropdownTrigger>
                                    <Button isIconOnly className="opacity-0 group-hover:opacity-100 transition">
                                        <Settings className="h-5 w-5" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem onClick={() => onOpen("update", { content: quote.content, id: quote.id })} key="edit">
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
                            <LikeButton quoteId={quote.id} isLiked={isLiked} />
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
