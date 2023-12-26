import { Quote, User } from "@prisma/client"

interface QuoteCardProps {
    quote: Quote & {
        user: User
    }
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
    return (
        <div className="col-span-1 rounded-xl border border-zinc-800 p-3 text-white">
            <p className="text-lg mb-3">
                {quote.content}
            </p>
            <p className="s text-zinc-500 font-mono text-right w-full">
                {quote.user.name}
            </p>
        </div>
    )
}
