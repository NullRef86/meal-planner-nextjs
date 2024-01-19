import Link from 'next/link'
import { env } from 'process'

export default function Home() {
    return (
        <main>
            <h1>
                Meal Planner
            </h1>
            <ul>
                <li>
                    <Link href="/ingredients">View All Ingredients</Link>
                </li>
                <li>
                    <Link href="/meals">View All Meals</Link>
                </li>
            </ul>

            <div>
                THIS_IS_SECRET: {env.THIS_IS_SECRET}
            </div>
        </main>
    )
}
