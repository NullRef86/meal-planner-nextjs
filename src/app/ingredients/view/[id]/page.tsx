import { getIngredient, updateIngredient } from "../../actions";
import Form from "../../_components/Form";
import Header from "../../../_components/Header";
import Main from "../../../_components/Main";
import { redirect } from "next/navigation";

export default async function View({ params }: { params: { id: string } }) {

    const ingredient = await getIngredient(Number(params.id));

    return (
        <Main>
            <Header backUrl="/ingredients">
                Edit Ingredient
            </Header>
            <Form
                ingredient={ingredient}
                action={async (formData) => {
                    'use server'
                    updateIngredient(formData);
                    redirect('/ingredients');
                }}
            />
        </Main>
    );
}
