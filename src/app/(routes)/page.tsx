import { HeaderText } from "../components/header";
import { QuoteGrid } from "../components/quote-grid"
import QuoteModal from "../components/quote-modal"
import { api } from "~/trpc/server"

export default async function Home() {
    const quotes = await api.quote.getQuotes.query()

    return (
        <main className="pattern pt-[10vh] min-h-screen">
            <HeaderText>
                Great  quotes from <br /> even better people
            </HeaderText>
            <QuoteGrid quotes={quotes} />
        </main>
    );
}
