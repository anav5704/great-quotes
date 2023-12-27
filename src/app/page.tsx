import { QuoteCard } from "./components/quote-card";
import QuoteModal from "./components/quote-modal";
import { api } from "~/trpc/server";
import { currentUser } from "./lib/currentUser";

export default async function Home() {
    const quotes = await api.quote.getQuotes.query()
    const user = await currentUser()

    return (
        <>
            <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
                Great  quotes from <br /> even better people
            </main>
            <main className="grid grid-cols-3 w-3/4 mx-auto gap-10 pb-32">
                {quotes.map((quote) => (
                   <QuoteCard key={quote.id} quote={quote} currentUser={user} />
                ))}
            </main>
        </>
    );
}
