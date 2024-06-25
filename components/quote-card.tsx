import { QuoteControls } from "@/components/quote-controls"
import { Quote, User } from "@/types"

interface QuoteCardProps {
    quote: Quote & {
        User: User
    },
    userId: string
}

export const QuoteCard = ({ quote, userId }: QuoteCardProps) => {
    return (
        <article data-test="quote-card" className='flex flex-col gap-5 justify-between col-span-1 group rounded-2xl border border-zinc-800 bg-zinc-900'>
            <p className='p-5 text-xl'>{quote.content}</p>
            <div className='flex items-center justify-between'>
                <QuoteControls quote={quote} userId={userId} />
                <p className='text-zinc-500 p-5 text-lg'>{quote.User.name}</p>
            </div>
        </article>
    )
}
