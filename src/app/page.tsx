import Link from 'next/link'

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
        </main>
    )
}
