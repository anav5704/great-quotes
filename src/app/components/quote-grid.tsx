import type { Like, Quote, User } from "@prisma/client"
import { currentUser } from "../lib/currentUser"
import { QuoteCard } from "./quote-card"

interface QuoteGridProps {
    quotes: (Quote & {
        user: User,
        likes: Like[]
    })[],
}

export const QuoteGrid = async ({ quotes }: QuoteGridProps) => {
const user = await currentUser()

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto md:w-3/4 w-4/5 gap-10 pb-10">
            {quotes.map((quote, index) => (
                <QuoteCard key={quote.id} quote={quote} currentUser={user} index={index}/>
            ))}
        </main>
    )
}
