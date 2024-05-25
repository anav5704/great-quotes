import { Header } from '@/components';
import { Github } from '@/public/icons/github';
import { Google } from '@/public/icons/google';
import { Button } from '@nextui-org/button';
import Image from 'next/image';

export const revalidate = 0;

export default async function Home() {
    return (
        <main
            id="hero"
            className="relative pt-[10vh] h-[90vh] flex flex-col items-center justify-center gap-8"
        >
            <Image
                fill
                quality={100}
                src="/league.png"
                alt="Image of the boys"
                className="absolute grayscale opacity-5 object-cover"
            />
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
                    stays for life.
                </span>
            </h3>
            <div className="space-x-5">
                <Button
                    size="lg"
                    radius="lg"
                    endContent={<Google />}
                    className="text-lg"
                >
                    Create Free Account
                </Button>
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
    );
}
