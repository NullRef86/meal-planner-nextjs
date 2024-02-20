'use client'

import { deleteIngredient } from "../../actions";
import { Button } from "../../../_components/client-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Ingredient } from "@prisma/client";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface IProps {
    ingredient: Ingredient;
}

export const ListItem = ({ ingredient }: IProps) => {
    return (
        <Link
            href={`/ingredients/view/${ingredient.id}`}
            className={`
                flex-grow
                p-3
                bg-white 
                border
                border-gray-200
                rounded-lg 
                shadow
                hover:bg-gray-100
                dark:bg-gray-800
                dark:border-gray-700 
                dark:hover:bg-gray-700
            `}
        >
            <li className="flex justify-between">
                <div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {ingredient.name}
                    </h3>
                    <div className="text-gray-600 dark:text-gray-400">
                        {ingredient.units}
                    </div>
                </div>
                <form action={deleteIngredient}>
                    <input type="hidden" name="id" value={ingredient.id} />
                    <Button className="px-3.5">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </form>
            </li>
        </Link>
    );
}

export default ListItem;