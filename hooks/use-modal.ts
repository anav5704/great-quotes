import { create } from "zustand"

interface ModalStore {
    type: "createQuote" | "updateQuote" | "deleteQuote" | null,
    data: { content?: string, id?: string },
    isOpen: boolean,
    onOpen: (type: "createQuote" | "updateQuote" | "deleteQuote", data?: { content?: string, id?: string }) => void,
    onClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: { content: "", id: "" },
    onOpen: (type, data = { content: "", id: "" }) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null })
}))