import { LikeCounter } from "~/app/components/like-counter"
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

    const quotes = await api.quote.getQuoteByUserId.query({ id: user?.id })

    const likes = await db.like.count({
        where: {
            quote: {
                userId: params.userId
            }
        }
    })

    return (
        <>
            <main className=" flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
                <p className="text-6xl">Quotes by {user?.name}</p>
                <br />
                <LikeCounter likes={likes} />
            </main>
            <QuoteGrid quotes={quotes} />
        </>

    )
}