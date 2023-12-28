"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react"
import { Button, ButtonGroup, Avatar } from "@nextui-org/react";
import { PlusCircle, User as UserIcon, LogOut, Heart} from "lucide-react"
import { Session } from "node_modules/next-auth/core/types"
import { signIn, signOut } from "next-auth/react"
import { useModal } from "../hooks/use-modal";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface AuthButtonProps {
    session: Session | null,
    user: User | null | undefined
}

export const AuthButton = ({ session, user }: AuthButtonProps) => {
    const { onOpen } = useModal()
    const router = useRouter()

    return (
        <div className="flex items-center gap-x-5">
            {session ? (
                <Dropdown className="dark text-white mt-6" backdrop="blur">
                    <DropdownTrigger>
                        <Avatar isBordered size="sm" src={session?.user?.image ?? ""} alt={`Profile image for ${session?.user?.name}`} className="dark rounded-full cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onClick={() => onOpen("create")} key="add">
                            <div className="flex items-center justify-between p-1">
                                Create Quote
                                <PlusCircle className="h-5 w-5" />
                            </div>
                        </DropdownItem>
                         <DropdownItem key="view" onClick={() => router.push(`/liked/${user?.id}`)}>
                            <div className="flex items-center justify-between p-1">
                                Liked Quotes
                                <Heart className="h-5 w-5" />
                            </div>
                        </DropdownItem><DropdownItem key="view" onClick={() => router.push(`/profile/${user?.id}`)}>
                            <div className="flex items-center justify-between p-1">
                                 View Profile
                                <UserIcon className="h-5 w-5" />
                            </div>
                        </DropdownItem>
                        <DropdownItem onClick={() => signOut()} key="logout" className="text-danger" color="danger">
                            <div className="flex items-center justify-between p-1">
                                Log Out
                                <LogOut className="h-5 w-5" />
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Button className="px-6 text-black font-medium" radius="sm" color="primary" variant="solid" onClick={() => signIn()}>Sign In</Button>
            )}
        </div>
    )
}
