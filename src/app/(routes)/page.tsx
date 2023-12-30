import { HeaderText } from "../components/header";
import { LoadQuotes } from "../components/load-quotes";
import { QuoteGrid } from "../components/quote-grid"
import QuoteModal from "../components/quote-modal"
import { currentUser } from "../lib/currentUser";
import { api } from "~/trpc/server"

export default async function Home() {
    const quotes = await api.quote.getQuotes.query({ page: 0 })
    const user = await currentUser()

    return (
        <main className={`${!user && "grid place-content-center"} pattern pt-[10vh] min-h-[90vh]`}>
            <HeaderText noMargin={user ? false : true}>
                Great  quotes from <br /> even better people
            </HeaderText>
            {!user && (
                <div className="w-fit mt-10 mx-auto p-2 bg-white items-center leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-zinc-300 text-zinc-800 px-2 uppercase py-1 text-xs font-bold mr-3">Welcome!</span>
                    <span className="font-semibold mr-2 text-left flex-auto">Please sign in to continue</span>
                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                </div>)}
            {user && (<QuoteGrid quotes={quotes} />)}
            {user && (<LoadQuotes user={user} type="all" />)}
        </main>
    );
}
