"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react"
import { Session } from "node_modules/next-auth/core/types"
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
                        <DropdownItem onClick={() => onOpen("add")} key="add">Add Quote</DropdownItem>
                        <DropdownItem key="view">View Profile</DropdownItem>
                        <DropdownItem onClick={() => signOut()} key="logout" className="text-danger" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Button className="px-6 text-black" radius="sm" size="sm" color="primary" variant="solid" onClick={() => signIn()}>Log In</Button>
            )}
        </div>
    )
}
