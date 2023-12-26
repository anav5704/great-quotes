import { create } from "zustand"

interface ModalStore {
    type: "create" | "update" | "delete" | null,
    data: string,
    isOpen: boolean,
    onOpen: (type: "create" | "update" | "delete", data?: string) => void,
    onClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: "",
    isOpen: false,
    onOpen: (type, data = "") => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null })
}))