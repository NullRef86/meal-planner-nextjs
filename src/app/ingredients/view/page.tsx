import { addIngredient } from "../actions";
import Link from "next/link";
import Form from "../_components/Form";
import Header from "../../_components/Header";
import Main from "../../_components/Main";

export default async function View() {


    return (
        <Main>
            <Header backUrl="/ingredients">
                Add New Ingredient
            </Header>

            <Form action={addIngredient} />
        </Main>
    );
}
