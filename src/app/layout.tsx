import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './main.scss'
import { useQueryClient } from 'react-query'
import Providers from './providers'
//import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Meal Planner',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>

                {/* <Analytics /> */}
            </body>
        </html>
    )
}
