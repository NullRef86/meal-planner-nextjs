import { Suspense } from "react";
import { addIngredient, getIngredients } from "./actions";
import { Button, DefaultButtonClassName } from "../_components/client-components/Button";
import { ListItem } from "./_components/client-components/ListItem";
import Link from "next/link";
import Header from "../_components/Header";
import Main from "../_components/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
    array.reduce((map, value, index, array) => {
        const key = predicate(value, index, array);
        map.get(key)?.push(value) ?? map.set(key, [value]);
        return map;
    }, new Map<Q, T[]>());

const List = async () => {
    const ingredients = await getIngredients();

    const groupedIngredients = Array.from(groupByToMap(ingredients, (ingredient) => ingredient.category));

    return (
        <div className="flex flex-col gap-4">
            {
                groupedIngredients
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, ingredients]) => (
                        <div key={category} className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b-slate-500 border-b-2 text-center pb-2">
                                {category}
                            </h2>
                            <ul className="flex flex-wrap gap-2">
                                {ingredients.map((ingredient) => (
                                    <ListItem key={ingredient.id} ingredient={ingredient} />
                                ))}
                            </ul>
                        </div>
                    ))
            }
        </div>
    );
}

export const dynamic = 'force-dynamic';

export default async function Home() {
    return (
        <Main>
            <Header backUrl="/">
                Ingredients
            </Header>

            <div className="flex justify-center mb-4">
                <Link className={DefaultButtonClassName} href={'/ingredients/view'}>
                    Add New Ingredient <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
                <List />
            </Suspense>
        </Main>
    );
}
