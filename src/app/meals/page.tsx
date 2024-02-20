import { Suspense } from "react";
import { getMeals } from "./actions";
import { DefaultButtonClassName } from "../_components/client-components/Button";
import { ListItem } from "./_components/client-components/ListItem";
import Link from "next/link";
import Header from "../_components/Header";
import Main from "../_components/Main";

const List = async () => {
    const meals = await getMeals();

    return (
        <ul className="flex flex-col gap-4">
            {meals.map((meal) => (
                <ListItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}


export default async function Home() {
    return (
        <Main>
            <Header backUrl="/">
                Meals
            </Header>

            <div className="flex justify-center mb-4">
                <Link className={DefaultButtonClassName} href={'/meals/view'}>
                    Add New Meal
                </Link>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
                <List />
            </Suspense>
        </Main>
    );
}
