import { QuoteGrid } from "~/app/components/quote-grid"
import { db } from "~/server/db"

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

    const liked = await db.like.findMany({
        where: {
            userId: params.userId
        },
        include: {
            quote: {
            include: {
                user: true,
                likes: true
            }
            }
        }
    })

    const quotes = liked.map((like) => like.quote)

    return (
        <>
        <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
            Quotes You Liked
        </main>
        <QuoteGrid quotes={quotes}/>
        </>
    )
}