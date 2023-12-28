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

    const quotes = await db.quote.findMany({
        where: {
            userId: params.userId
        },
        include: {
            user: true,
            likes: true,
        }
    })

    return (
        <>
        <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
            Quotes by {user?.name}
        </main>
        <QuoteGrid quotes={quotes} />
        </>

    )
}