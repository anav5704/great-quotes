"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal"
import { useEffect, useState } from "react"
import { useModal } from "@/hooks/use-modal"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { Input } from "@nextui-org/input"
import axios from "axios"

export const QuoteModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [quote, setQuote] = useState<string>("")
    const [error, setError] = useState("")
    const router = useRouter()

    const action = type === "createQuote" ? "Create" : type === "updateQuote" ? "Update" : "Delete"

    // useEffect(() => {
    //     setQuote("")
    //     setError("")
    //     if (type === "update" && data.content) setQuote(data.content)
    // }, [data, isOpen])


    const mutateQuote = async () => {
        try {
            setIsLoading(true)

            if (type === "createQuote") {
                await axios.post("/api/quotes", { quote })
            }
            else if (type === "updateQuote") {
                if (!data.id) throw Error("Quote ID is required")
                console.log("Updating Quote")
            }
            else {
                if (!data.id) throw Error("Quote ID is required")
                console.log("Deleting Quote")
            }

            router.refresh()
            setQuote("")
            onClose()
        }
        catch (error) {
            console.log("Mutate quote error: ", error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal placement="center" closeButton={<></>} className="shadow-none rounded-2xl dark  border border-zinc-800" onOpenChange={onClose} isOpen={isOpen} backdrop="blur">
            <ModalContent>
                <ModalHeader className="text-3xl">{action} Quote</ModalHeader>
                <ModalBody>
                    {type === "createQuote" && (<p>You can edit and delete this quote later on.</p>)}
                    {type === "updateQuote" && (<p>Feel free to make changes to your quote.</p>)}
                    {type === "deleteQuote" && (<p>You sure? This quote will be permanently removed.</p>)}
                    {type !== "deleteQuote" && (
                        <Input
                            type="text"
                            size="lg"
                            placeholder="There's no place like home."
                            value={quote} onChange={(e) => setQuote(e.target.value)}
                        />)}
                    {error && (<p className="text-rose-500">{error}</p>)}
                </ModalBody>
                <ModalFooter className="gap-x-3">
                    <Button isDisabled={isLoading} radius="lg" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button isDisabled={isLoading} isLoading={isLoading} radius="lg" onPress={mutateQuote} className="text-black bg-white">
                        {action}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
