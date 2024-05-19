import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Footer, Navbar } from "@/components"

import type { Metadata } from "next"
import { Karla } from "next/font/google"
import './globals.css'

const font = Karla({ subsets: ["latin"], weight: ["400"] })

export const metadata: Metadata = {
    title: "Great Quotes",
    description: "A collection of great quotes from even better people.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={font.className}>
                {/* <ModalProvider /> */}
                <SpeedInsights />
                <Analytics />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
