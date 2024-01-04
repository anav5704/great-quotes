"use client"

import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { PenLine, MoreVertical, Trash } from "lucide-react"
import type { Like, Quote, User } from "@prisma/client"
import { useModal } from "~/app/hooks/use-modal"
import { useRouter } from "next/navigation"
import { LikeButton } from "./like-button"
import { motion } from "framer-motion"

interface QuoteCardProps {
    quote: Quote & {
        user: User,
        likes: Like[]
    },
    currentUser: User | null | undefined,
    index: number,
}

export const QuoteCard = ({ quote, currentUser, index }: QuoteCardProps) => {
    const isLiked = quote.likes.some((like) => like.userId === currentUser?.id)
    const { onOpen } = useModal()
    const router = useRouter()

    const names = quote.user.name.split(' ');
    const capitalizedWords = names.map(name => name.charAt(0).toUpperCase() + name.slice(1));
    const name = capitalizedWords.join(' ');

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: index * 0.15,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
        >
            <Card className="dark h-full">
                <CardBody className="group">
                    <div className="flex flex-col justify-between h-full">
                        <p className="text-xl mb-5 italic">
                            "{quote.content}"
                        </p>
                        <div className="flex items-end justify-between">
                            <div className="flex items-center gap-x-3">
                                {quote.userId === currentUser?.id && (
                                    <Dropdown className="dark text-white mt-6" backdrop="blur">
                                        <DropdownTrigger>
                                            <Button isIconOnly className="md:opacity-0 group-hover:opacity-100 transition">
                                                <MoreVertical className="h-5 w-5" />
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
                                <LikeButton quoteId={quote.id} isLiked={isLiked} likeCount={quote.likes.length} />
                            </div>
                            <p onClick={() => router.push(`/profile/${quote.userId}`)} className=" text-zinc-500 cursor-pointer">
                                - {name}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )
}
