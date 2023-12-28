import { QuoteCard } from "../components/quote-card";
import QuoteModal from "../components/quote-modal";
import { api } from "~/trpc/server";
import { currentUser } from "../lib/currentUser";
import { QuoteGrid } from "../components/quote-grid";
 
export default async function Home() {
    const quotes = await api.quote.getQuotes.query()
    const user = await currentUser()

    return (
        <>
            <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
                Great  quotes from <br /> even better people
            </main>
            <QuoteGrid quotes={quotes} /> 
        </>
    );
}
