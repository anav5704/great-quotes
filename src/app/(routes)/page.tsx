import { QuoteGrid } from "../components/quote-grid"
import QuoteModal from "../components/quote-modal"
import { api } from "~/trpc/server"
 
export default async function Home() {
    const quotes = await api.quote.getQuotes.query()

    return (
        <>
            <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
                Great  quotes from <br /> even better people
            </main>
            <QuoteGrid quotes={quotes} /> 
        </>
    );
}
