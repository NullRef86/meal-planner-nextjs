import { getMeal, updateMeal } from "../../actions";
import Form from "../../_components/Form";
import Header from "../../../_components/Header";
import Main from "../../../_components/Main";
import { getIngredients } from "@/app/ingredients/actions";

export const dynamic = 'force-dynamic';

export default async function View({ params }: { params: { id: string } }) {

    const meal = await getMeal(Number(params.id));
    const ingredients = await getIngredients();

    if (!meal) return <div>Meal not found</div>;

    return (
        <Main>
            <Header backUrl="/meals">
                Edit Meal
            </Header>
            <Form
                action={updateMeal}
                ingredients={ingredients}
                initialFormData={{
                    id: meal.id,
                    name: meal.name,
                    ingredients: meal.ingredients.map(i => ({
                        amount: i.amount,
                        ingredient: i.ingredient
                    }))
                }}
            />
        </Main>
    );
}
