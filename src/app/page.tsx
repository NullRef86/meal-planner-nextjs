import Link from 'next/link'

export default function Home() {
    return (
        <main className="home-page">
            <h1>
                Meal Planner
            </h1>
            <div>
                <Link href="/ingredients">View All Ingredients</Link>
            </div>
            <div>
                <Link href="/meals">View All Meals</Link>
            </div>
        </main>
    )
}