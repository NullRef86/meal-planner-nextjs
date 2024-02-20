import Main from './_components/Main'
import Header from './_components/Header'
import Link from './_components/Link'

export default function Home() {
    return (
        <Main>
            <Header>
                Meal Planner
            </Header>
            <div className='flex flex-col gap-2'>
                <Link href="/ingredients">
                    View All Ingredients
                </Link>
                <Link href="/meals">
                    View All Meals
                </Link>
            </div>
        </Main>
    )
}