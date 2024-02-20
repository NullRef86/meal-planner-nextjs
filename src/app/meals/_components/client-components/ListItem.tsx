'use client'

import { deleteMeal } from "../../actions";
import { Button } from "../../../_components/client-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { MealWithIngredients } from "../../models";

interface IProps {
    meal: MealWithIngredients;
}

export const ListItem = ({ meal }: IProps) => {
    return (
        <Link href={`/meals/view/${meal.id}`}>
            <li
                key={meal.id}
                className="flex justify-between px-6 py-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {meal.name}
                    </h2>
                    <ul>
                        {
                            meal.ingredients.map((i) => (
                                <li key={i.ingredientId} className="list-inside list-disc">
                                    {i.ingredient.name} <span className="italic">({i.amount} {i.ingredient.units})</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <form action={deleteMeal}>
                    <input type="hidden" name="id" value={meal.id} />
                    <Button>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </form>
            </li>
        </Link>
    );
}

export default ListItem;