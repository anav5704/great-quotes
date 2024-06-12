import { Quote, User } from "@/types"
import { CopyQuote } from "@/components"

interface QuoteCardProps {
    quote: Quote & {
        User: User
    }
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
    return (
        <div className='flex flex-col gap-5 justify-between col-span-1 group rounded-2xl border border-zinc-800 bg-zinc-900'>
            <p className='p-5 text-xl'>{quote.content}</p>
            <div className='flex items-center justify-between'>
                <CopyQuote content={quote.content} author={quote.User.name} />
                <p className='text-zinc-500 p-5 text-lg'>{quote.User.name}</p>
            </div>
        </div>
    )
}
