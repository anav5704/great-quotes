import { Like, Quote, User } from "@prisma/client"
import { QuoteCard } from "./quote-card"
import { currentUser } from "../lib/currentUser"

interface QuoteGridProps {
    quotes: (Quote & {
        user: User,
        likes: Like[]
    })[],
}

export const QuoteGrid = async ({ quotes }: QuoteGridProps) => {
    const user = await currentUser()

    return (
        <main className="grid grid-cols-3 w-3/4 mx-auto gap-10 pb-32">
            {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} currentUser={user} />
            ))}
        </main>
    )
}
