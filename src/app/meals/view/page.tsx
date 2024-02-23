import { addMeal } from "../actions";
import Form from "../_components/Form";
import Header from "../../_components/Header";
import Main from "../../_components/Main";
import { getIngredients } from "@/app/ingredients/actions";

export const dynamic = 'force-dynamic';

export default async function View() {

    const ingredients = await getIngredients();

    return (
        <Main>
            <Header backUrl="/meals">
                Add New Meal
            </Header>

            <Form
                action={addMeal}
                initialListOfAllIngredients={ingredients}
            />
        </Main>
    );
}
