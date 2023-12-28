import { getServerAuthSession } from "~/server/auth";
import { AuthButton } from "./auth-button";
import { currentUser } from "../lib/currentUser";
import { NavLogo } from "./nav-logo";

export const Navbar = async () => {
    const session = await getServerAuthSession()
    const user = await currentUser()

    return (
        <nav className="backdrop-blur-sm h-[10vh] text-white border-b border-zinc-800 flex items-center justify-between fixed px-56 w-full">
            <NavLogo />
            <AuthButton session={session} user={user} />
        </nav>
    )
}
