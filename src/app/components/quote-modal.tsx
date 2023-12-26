"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useModal } from "../hooks/use-modal";
import { Input } from "@nextui-org/input";
import { Quote } from "lucide-react"
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

export default function QuoteModal() {
    const { isOpen, onClose, type, data } = useModal()
    const { mutate: createQuote } = api.quote.createQuote.useMutation()
    const { mutate: updateQuote } = api.quote.updateQuote.useMutation()
    const { mutate: deleteQuote } = api.quote.deleteQuote.useMutation()
    const [quote, setQuote] = useState<string>("")

    useEffect(() => {
        data.content && setQuote(data.content)
    }, [data, isOpen])

    const action = type === "create" ? "Create" : type === "update" ? "Update" : "Delete"

    const handleClick = async () => {
        try {
            if (type === "create") {
                createQuote({ content: quote })
            }
            else if (type === "update") {
                if (!data.id) throw Error("Quote ID is required")
                updateQuote({ content: quote, id: data.id })
            }
            else {
                if (!data.id) throw Error("Quote ID is required")
                deleteQuote({ id: data.id })
            }
            setQuote("")
        } catch (error) {
            console.log("Quote mutation frontend error: ", error)
        }
    }

    return (
        <>
            <Modal className="dark text-white" isOpen={isOpen} onOpenChange={() => onClose()} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{action} Quote</ModalHeader>
                            <ModalBody>
                                <p>You can edit and delete this quote later on.</p>
                                <Input value={quote} onChange={(e) => setQuote(e.target.value)} type="email" placeholder="There's no place like home."
                                    startContent={
                                        <Quote className="mr-2 text-zinc-500 h-5 w-5" />
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button radius="sm" color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button radius="sm" onClick={() => handleClick()} color="primary" className="text-black" onPress={() => onClose()}>
                                    {action}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
