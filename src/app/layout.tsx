'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './main.scss'
// import { Analytics } from '@vercel/analytics/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Ingredients from './ingredients/list'
import Form from './ingredients/form'
import Meals from './meals/list'
import IngredientsRouter from './ingredients/_router'
import List from './ingredients/list'
import MealsRouter from './meals/_router'

const inter = Inter({ subsets: ['latin'] })

export default function App() {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    }));

    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>

                            <Route path="/ingredients/*" element={<IngredientsRouter />} />

                            <Route path="/meals/*" element={<MealsRouter />} />

                            <Route path="/" element={(
                                <main className="home-page">
                                    <h1>
                                        Meal Planner
                                    </h1>
                                    <div>
                                        <Link to="/ingredients">View All Ingredients</Link>
                                    </div>
                                    <div>
                                        <Link to="/meals">View All Meals</Link>
                                    </div>
                                </main>
                            )} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
                {/* <Analytics /> */}
            </body>
        </html>
    )
}
