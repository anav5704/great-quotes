import { create } from "zustand"

interface ModalStore {
    type: "create" | "update" | "delete" | null,
    data: { content?: string, id?: string },
    isOpen: boolean,
    onOpen: (type: "create" | "update" | "delete", data?: { content?: string, id?: string }) => void,
    onClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: { content: "", id: "" },
    isOpen: false,
    onOpen: (type, data = { content: "", id: "" }) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null })
}))