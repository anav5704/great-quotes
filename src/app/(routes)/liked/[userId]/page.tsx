import { LoadQuotes } from "~/app/components/load-quotes"
import { QuoteGrid } from "~/app/components/quote-grid"
import { HeaderText } from "~/app/components/header"
import { Alert } from "~/app/components/alert"
import { api } from "~/trpc/server"
import { db } from "~/server/db"

export const revalidate = 0

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
        <main className={`${!quotes.length && "grid place-content-center"} pattern pt-[10vh] min-h-[90vh]`}>
            <HeaderText noMargin={quotes.length === 0}>
                Quotes You Liked
            </HeaderText>
            {!quotes.length && (<Alert title="oops!" message="You haven't liked any quotes yet." />)}
            {quotes.length > 0 && ( <QuoteGrid quotes={quotes} /> )}
            {quotes.length === 6 && ( <LoadQuotes user={user} type="liked" /> )}
        </main>
    )
}