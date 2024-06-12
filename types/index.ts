export interface User {
    id: string
    name: string
    email: string
    quotes?: Quote[]
    createAt: string | Date
}

export interface Quote {
    id: string
    content: string
    userId: string
    User: User
    createdAt: string | Date
    updatedAt: string | Date
}