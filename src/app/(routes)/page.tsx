import { LoadQuotes } from "../components/load-quotes";
import { QuoteGrid } from "../components/quote-grid"
import { HeaderText } from "../components/header";
import { currentUser } from "../lib/currentUser";
import { api } from "~/trpc/server"
import { Alert } from "../components/alert";

export const revalidate = 0

export default async function Home() {
    const quotes = await api.quote.getQuotes.query({ page: 0 })
    const user = await currentUser()

    return (
        <main className={`${!user && "grid place-content-center"} pattern pt-[10vh] min-h-[90vh]`}>
            <HeaderText noMargin={!!!user}>
                Great  quotes from <br /> even better people
            </HeaderText>
            {!user && ( <Alert title="welcome!" message="Please sign in to continue." redirect />  )}
            {user && (<QuoteGrid quotes={quotes} />)}
            {user && (<LoadQuotes user={user} type="all" />)}
        </main>
    );
}
