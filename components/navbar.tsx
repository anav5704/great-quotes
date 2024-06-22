import { Github } from '@/public/icons/github'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav className="z-50 bg-zinc-950 h-[10vh] border-b border-zinc-800 fixed w-full">
            <div className="flex items-center justify-between w-11/12 lg:w-3/4 mx-auto h-full">
                <Link
                    className="text-lg font-medium cursor-pointer leading-none"
                    href="/"
                >
                    Great <br /> Quotes
                </Link>
                <a target='_blank' href="https://github.com/anav5704/great-quotes"><Github /></a>
            </div>
        </nav>
    )
}
