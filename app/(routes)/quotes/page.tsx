import { Header, SignIn } from '@/components'
import { db } from '@/drizzle'
import { Quote, User } from '@/drizzle/schema'
import { desc } from 'drizzle-orm'

export default async function Home() {

    const quotes = await db.query.Quote.findMany({
        orderBy: desc(Quote.createdAt),
    })

    return (
        <main className="pt-[10vh] min-h-[90vh]">
            <div className='py-32'>
                <Header>Wise Men Once Said</Header>
            </div>
            <div className='grid grid-cols-2 w-3/4 mx-auto gap-7 mb-20'>
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        className='border border-zinc-800 min-h-40 flex flex-col justify-between col-span-1 p-5 bg-zinc-900 rounded-2xl'
                    >
                        <h3 className='text-xl italic mb-5'>
                            "{quote.content}"
                        </h3>
                        <p className='text-zinc-500 text-right'>{quote.createdAt}</p>

                    </div>
                ))}
            </div>

        </main>
    )
}
