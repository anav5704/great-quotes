import { HeaderText } from "~/app/components/header"
import { LoadQuotes } from "~/app/components/load-quotes"
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

    if (!user) return

    const quotes = await api.quote.getLikedQuotes.query({ userId: user?.id, page: 0 })

    return (
        <main className="pattern pt-[10vh] min-h-[90vh]">
            <HeaderText>
                Quotes You Liked
            </HeaderText>
            <QuoteGrid quotes={quotes} />
            <LoadQuotes user={user} type="liked"    />
        </main>
    )
}