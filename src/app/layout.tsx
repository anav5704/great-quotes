import "~/styles/globals.css";

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./components/navbar";
import { ModalProvider } from "./providers/modal-provider";

export const metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-zinc-950`}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    <ModalProvider />
                    <Navbar />
                    <main>
                        {children}
                    </main>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
