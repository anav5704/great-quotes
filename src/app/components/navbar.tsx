import { getServerAuthSession } from "~/server/auth";
import { AuthButton } from "./auth-button";

export const Navbar = async () => {
    const session = await getServerAuthSession();

    return (
        <nav className="h-[10vh] text-white border-b border-zinc-800 flex items-center justify-between fixed px-56 w-full">
            <div>
                Great Quotes
            </div>
            <AuthButton session={session} />
        </nav>
    )
}
