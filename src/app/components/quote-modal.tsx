"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { TRPCClientError } from "@trpc/client";
import { useModal } from "../hooks/use-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Quote } from "lucide-react"
import { api } from "~/trpc/react";

export default function QuoteModal() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isOpen, onClose, type, data } = useModal()
    const [error, setError] = useState<string>("")
    const [quote, setQuote] = useState<string>("")
    const router = useRouter()

    const action = type === "create" ? "Create" : type === "update" ? "Update" : "Delete"

    useEffect(() => {
        setQuote("")
        setError("")
        if (type === "update" && data.content) setQuote(data.content)
    }, [data, isOpen])

    const handleSuccess = () => {
        router.refresh()
        setIsLoading(false)
        onClose()
    }

    const handleError = (error: any) => {
        const errorMessage = error?.data?.zodError?.fieldErrors?.content
        if (errorMessage && errorMessage[0]) {
            setError(errorMessage[0])
            setIsLoading(false)
        }
    }

    const { mutate: createQuote } = api.quote.createQuote.useMutation({
        onSuccess: () => handleSuccess(),
        onError: (error) => handleError(error)
    })

    const { mutate: updateQuote } = api.quote.updateQuote.useMutation({
        onSuccess: () => handleSuccess(),
        onError: (error) => handleError(error)
    })

    const { mutate: deleteQuote } = api.quote.deleteQuote.useMutation({
        onSuccess: () => handleSuccess(),
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
        <Modal closeButton={<></>} className="dark text-white" onOpenChange={onClose} isOpen={isOpen} backdrop="blur">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{action} Quote</ModalHeader>
                <ModalBody>
                    {type === "create" && ( <p>You can edit and delete this quote later on.</p> )}
                    {type === "update" && ( <p>Feel free to make changes to your quote.</p> )}
                    {type === "delete" && ( <p>You sure? This quote will be permanently removed.</p> )}
                    {type !== "delete" && (
                        <Input
                            type="text"
                            placeholder="There's no place like home."
                            value={quote} onChange={(e) => setQuote(e.target.value)}
                            startContent={
                                <Quote fill="#52525b" className="mr-2 text-zinc-600 h-5 w-5" />
                            }
                        />)}
                        {error && ( <p className="text-rose-500">{error}</p> )}
                </ModalBody>
                <ModalFooter className="gap-x-3">
                    <Button isDisabled={isLoading} radius="sm" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button isLoading={isLoading} radius="sm" onClick={() => handleClick()} color="primary" className="text-black">
                        {action}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
