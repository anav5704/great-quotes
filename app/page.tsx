import { Header, AddQuote, CreateAccount, CopyQuote, QuoteCard } from '@/components'
import { Quote, User } from '@/drizzle/schema'
import { currentUser } from '@/lib/user'
import { desc } from 'drizzle-orm'
import { db } from '@/drizzle'

export default async function Home() {
    const user = await currentUser()

    const quotes = await db.query.Quote.findMany({
        with: {
            User: true
        },
        orderBy: desc(Quote.createdAt)
    })

    return (
        <main
            id="hero"
            className="mx-auto w-11/12 lg:w-3/4 py-[10vh] min-h-[90vh]"
        >
            <section className='py-24 flex flex-col items-center justify-center gap-8'>
                <Header data-testid="hero-text" className='text-center'>Great Quotes From Great People.</Header>
                <h3 className="text-xl md:text-2xl text-zinc-500 text-center">
                    Friends talk. Friends talk{' '}
                    <span className="text-white">
                        way too much.
                    </span>
                    {" "}
                    They won't stop talking.
                    {" "}
                    <br className='hidden md:block' />
                    And once in a while, they say something that{' '}
                    <span className="text-white">
                        sticks for life.
                    </span>
                </h3>
                <div className="space-x-5">
                    {user ? <AddQuote /> : <CreateAccount />}

                </div>
            </section>
            <section className='mx-auto grid grid-cols-1 md:grid-cols-2 gap-7'>
                {quotes.map((quote, index) => (
                    <QuoteCard key={index} quote={quote} userId={user?.id || ""} />
                ))}
            </section>
        </main>
    )
}
