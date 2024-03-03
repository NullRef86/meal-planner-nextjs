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
                ps-2
                p-1
                w-auto
                border
                rounded-lg 
                shadow
                bg-gray-800
                border-gray-700 
                hover:bg-gray-700
            `}
        >
            <li className="flex justify-between items-center">
                <div>
                    <span className="me-2 text-md font-bold tracking-tight text-white">
                        {ingredient.name}
                    </span>
                    <span className="text-sm text-gray-400">
                        {ingredient.units}
                    </span>
                </div>
                <form action={deleteIngredient}>
                    <input type="hidden" name="id" value={ingredient.id} />
                    <Button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </form>
            </li>
        </Link>
    );
}

export default ListItem;