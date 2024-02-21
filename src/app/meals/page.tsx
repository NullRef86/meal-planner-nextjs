import { Suspense } from "react";
import { getMeals } from "./actions";
import { DefaultButtonClassName } from "../_components/client-components/Button";
import { ListItem } from "./_components/client-components/ListItem";
import Link from "next/link";
import Header from "../_components/Header";
import Main from "../_components/Main";
import LoadingPanel from "../_components/LoadingPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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


export const dynamic = 'force-dynamic';

export default async function Meals() {
    return (
        <Main>
            <Header backUrl="/">
                Meals
            </Header>

            <div className="flex justify-center mb-4">
                <Link className={DefaultButtonClassName} href={'/meals/view'}>
                    Add New Meal <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>

            <Suspense fallback={<LoadingPanel />}>
                <List />
            </Suspense>
        </Main>
    );
}
