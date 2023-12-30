import { HeaderText } from "~/app/components/header"
import { LikeCounter } from "~/app/components/like-counter"
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

    const quotes = await api.quote.getQuoteByUserId.query({ id: user?.id, page: 0 })

    const likes = await db.like.count({
        where: {
            quote: {
                userId: params.userId
            }
        }
    })

    return (
        <main className="pattern pt-[10vh] min-h-[90vh]">
            <HeaderText>
                Quotes by {user?.name}
            </HeaderText>
            {/* <br /> */}
            {/* <LikeCounter likes={likes} /> */}
            <QuoteGrid quotes={quotes} />
            <LoadQuotes  user={user} type="user" />
        </main>

    )
}