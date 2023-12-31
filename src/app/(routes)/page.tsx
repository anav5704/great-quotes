import { LoadQuotes } from "../components/load-quotes";
import { QuoteGrid } from "../components/quote-grid"
import { HeaderText } from "../components/header";
import { currentUser } from "../lib/currentUser";
import { api } from "~/trpc/server"
import { WelcomeAlert } from "../components/welcome-alert";

export const revalidate = 0

export default async function Home() {
    const quotes = await api.quote.getQuotes.query({ page: 0 })
    const user = await currentUser()

    return (
        <main className={`${!user && "grid place-content-center"} pattern pt-[10vh] min-h-[90vh]`}>
            <HeaderText noMargin={user ? false : true}>
                Great  quotes from <br /> even better people
            </HeaderText>
            {!user && ( <WelcomeAlert />  )}
            {user && (<QuoteGrid quotes={quotes} />)}
            {user && (<LoadQuotes user={user} type="all" />)}
        </main>
    );
}
