'use client'

import { deleteMeal } from "../../actions";
import { Button } from "../../../_components/client-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { MealWithIngredients } from "../../models";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface IProps {
    meal: MealWithIngredients;
}

export const ListItem = ({ meal }: IProps) => {
    return (
        <Link href={`/meals/view/${meal.id}`}>
            <li
                key={meal.id}
                className="flex justify-between px-6 py-3 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
                <div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        {meal.name}
                    </h2>
                    <ul>
                        {
                            meal.ingredients.map((recepeItem) => (
                                <li key={recepeItem.ingredient.id} className="grid grid-cols-2 gap-2">
                                    <span className="flex gap-1 text-sm text-gray-400">
                                        <span>
                                            {recepeItem.amount}
                                        </span>
                                        <span>
                                            {recepeItem.ingredient.units}
                                        </span>
                                    </span>
                                    <span className="text-md font-bold tracking-tight text-white">
                                        {recepeItem.ingredient.name}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <form action={deleteMeal}>
                    <input type="hidden" name="id" value={meal.id} />
                    <Button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </form>
            </li>
        </Link>
    );
}

export default ListItem;