export const useRouter = jest.fn().mockImplementation(() => {
    return {
        refresh: jest.fn(),
    }
})