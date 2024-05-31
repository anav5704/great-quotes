import { Header, SignIn } from '@/components'
import { currentUser } from '@/lib/user'
import { Github } from '@/public/icons/github'

import { Button } from '@nextui-org/button'
import { redirect } from 'next/navigation'

export default async function Home() {
    const user = await currentUser()
    if (user) return redirect("/quotes")

    return (
        <main
            id="hero"
            className="pt-[10vh] h-[90vh] flex flex-col items-center justify-center gap-8"
        >
            <Header>Great Quotes From Great People.</Header>
            <h3 className="text-2xl text-zinc-500 text-center">
                Friends talk. Friends talk{' '}
                <span className="text-white">
                    way too much.
                </span>{' '}
                They won't stop talking.
                <br />
                And once in a while, they say something that{' '}
                <span className="text-white">
                    sticks for life.
                </span>
            </h3>
            <div className="space-x-5">
                <SignIn />
                <Button
                    size="lg"
                    radius="lg"
                    endContent={<Github />}
                    className="text-white bg-zinc-900 text-lg"
                >
                    Source Code
                </Button>
            </div>
        </main>
    )
}
