import { create } from "zustand"

interface ModalStore {
    type: "add" | "edit" | null,
    data: string,
    isOpen: boolean,
    onOpen: (type: "add" | "edit", data?: string) => void,
    onClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: "",
    isOpen: false,
    onOpen: (type, data = "") => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null })
}))