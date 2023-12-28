import { QuoteGrid } from "~/app/components/quote-grid"
import { db } from "~/server/db"
import { api } from "~/trpc/server"

interface ProfilePageProps {
    params: {
        userId: string
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const user = await db.user.findFirst({
        where: {
            id: params.userId
        }
    })

    if(!user) return 

    const quotes = await api.quote.getLikedQuotes.query({ userId: user?.id })
    
    return (
        <>
            <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
                Quotes You Liked
            </main>
            <QuoteGrid quotes={quotes} />
        </>
    )
}