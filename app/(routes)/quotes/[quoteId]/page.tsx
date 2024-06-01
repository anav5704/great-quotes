import { Header, SignIn } from '@/components'
import { db } from '@/drizzle'
import { Quote } from '@/drizzle/schema'
import { desc, eq } from 'drizzle-orm'

export default async function QuotePage({ params }: { params: { quoteId: string } }) {

    const quote = await db.query.Quote.findFirst({
        where: eq(Quote.id, params.quoteId),
        with: {
            User: true
        }
    })

    return (
        <main className="pt-[10vh] min-h-[90vh] grid place-content-center">
            <div className='mx-auto w-3/4 text-left text-balance space-y-10'>
                <Header>"{quote?.content}"</Header>
                <p className='text-3xl text-right text-zinc-500'>{quote?.User.name}</p>
            </div>
        </main>
    )
}
