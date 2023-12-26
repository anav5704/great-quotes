"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useModal } from "../hooks/use-modal";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Quote } from "lucide-react"
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function QuoteModal() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isOpen, onClose, type, data } = useModal()
    const [quote, setQuote] = useState<string>("")
    const router = useRouter()

    const action = type === "create" ? "Create" : type === "update" ? "Update" : "Delete"

    useEffect(() => {
        setQuote("")
        if (type === "update" && data.content) setQuote(data.content)
    }, [data, isOpen])

    const success = () => {
        router.refresh()
        setIsLoading(false)
        onClose()
    }

    const { mutate: createQuote } = api.quote.createQuote.useMutation({
        onSuccess: () => success(),
        onError: (error) => console.log("Quote mutation error", error)
    })

    const { mutate: updateQuote } = api.quote.updateQuote.useMutation({
        onSuccess: () => success(),
        onError: (error) => console.log("Quote mutation error", error)
    })

    const { mutate: deleteQuote } = api.quote.deleteQuote.useMutation({
        onSuccess: () => success(),
        onError: (error) => console.log("Quote mutation error", error)
    })

    const handleClick = () => {
        setIsLoading(true)
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
    }

    return (
        <Modal closeButton={<></>} className="dark text-white" isOpen={isOpen} backdrop="blur">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{action} Quote</ModalHeader>
                <ModalBody>
                    <p>You can edit and delete this quote later on.</p>
                    {type !== "delete" && (
                        <Input isDisabled={isLoading} value={quote} onChange={(e) => setQuote(e.target.value)} type="email" placeholder="There's no place like home."
                            startContent={
                                <Quote className="mr-2 text-zinc-500 h-5 w-5" />
                            }
                        />)}
                </ModalBody>
                <ModalFooter>
                    <Button isDisabled={isLoading} radius="sm" color="danger" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button isLoading={isLoading} radius="sm" onClick={() => handleClick()} color="primary" className="text-black">
                        {action}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
