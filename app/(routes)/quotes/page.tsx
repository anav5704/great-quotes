import { CopyQuote, Header, SignIn } from '@/components'
import { db } from '@/drizzle'
import { Quote, User } from '@/drizzle/schema'
import { desc } from 'drizzle-orm'

export default async function QuotesPage() {

    const quotes = await db.query.Quote.findMany({
        orderBy: desc(Quote.createdAt),
        with: {
            User: true
        }
    })

    return (
        <main className="pt-[10vh] min-h-[90vh]">
            <div className='py-32'>
                <Header className='text-center'>Wise Men Once Said</Header>
            </div>
            <div className='grid grid-cols-2 w-3/4 mx-auto gap-7 mb-20'>
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        className='group border border-zinc-800 min-h-40 flex flex-col justify-between col-span-1 bg-zinc-900 rounded-2xl'
                    >
                        <h3 className='text-xl italic mb-5 p-5'>
                            "{quote.content}"
                        </h3>
                        <div className='flex items-center justify-between'>
                            <CopyQuote id={quote.id} />
                            <p className='text-zinc-500 text-right text-lg p-5'>{quote.User.name}</p>
                        </div>
                    </div>
                ))}
            </div>

        </main>
    )
}
