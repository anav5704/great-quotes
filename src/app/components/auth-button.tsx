"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react"
import { Session } from "node_modules/next-auth/core/types"
import { PlusCircle, User, LogOut, Heart} from "lucide-react"
import { Button, ButtonGroup } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react"
import { useModal } from "../hooks/use-modal";
import Image from "next/image"

interface AuthButtonProps {
    session: Session | null
}

export const AuthButton = ({ session }: AuthButtonProps) => {
    const { onOpen } = useModal()

    return (
        <div className="flex items-center gap-x-5">
            {session ? (
                <Dropdown className="dark text-white mt-6" backdrop="blur">
                    <DropdownTrigger>
                        <Image src={session?.user?.image ?? ""} alt={`Profile image for ${session?.user?.name}`} height={35} width={35} className="rounded-full cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onClick={() => onOpen("create")} key="add">
                            <div className="flex items-center justify-between p-1">
                                Create Quote
                                <PlusCircle className="h-5 w-5" />
                            </div>
                        </DropdownItem>
                         <DropdownItem key="view">
                            <div className="flex items-center justify-between p-1">
                                Liked Quotes
                                <Heart className="h-5 w-5" />
                            </div>
                        </DropdownItem><DropdownItem key="view">
                            <div className="flex items-center justify-between p-1">
                                View Profile
                                <User className="h-5 w-5" />
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
