import { Footer, Navbar } from '@/components'
import { Analytics } from '@vercel/analytics/react'
import { ModalProvider } from "@/providers/modal-provider"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Karla } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const font = Karla({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
    title: 'Great Quotes',
    description:
        'A collection of fun and inspirational quotes.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ModalProvider />
                <SpeedInsights />
                <Analytics />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
