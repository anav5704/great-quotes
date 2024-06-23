export const useModal = jest.fn().mockImplementation(() => {
    return {
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn(),
        type: "",
        data: {},
    }
})