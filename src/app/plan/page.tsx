import { Suspense } from "react";
import Header from "../_components/Header";
import Main from "../_components/Main";
import LoadingPanel from "../_components/LoadingPanel";
import MealCheckList from "./_components/MealCheckList";
import { getMeals } from "../meals/actions";

export const dynamic = 'force-dynamic';

export default function Plan() {
    const List = async () => {
        const meals = await getMeals();

        return (
            <MealCheckList meals={meals} />
        );
    }

    return (

        <Main>
            <Header backUrl="/">
                Plan
            </Header>

            <Suspense fallback={<LoadingPanel />}>
                <List />
            </Suspense>
        </Main>

    );
}