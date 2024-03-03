'use client'

import { Ingredient } from "@prisma/client";
import { Button } from "../../_components/client-components/Button";
import Input from "../../_components/Input";
import { useEffect, useState } from "react";
import IncludeIngredientForm from "./IncludeIngredientForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface IProps {
    initialFormData?: IFormData;
    initialListOfAllIngredients: Ingredient[];
    action: (meal: IFormData) => void;
}

export interface IFormData {
    id?: number;
    name: string;
    ingredients: { ingredient: Ingredient, amount: number }[];
}
export default function Form({ initialFormData, initialListOfAllIngredients, action }: IProps) {
    const EMPTY_FORM: IFormData = {
        name: '',
        ingredients: [],
    }

    const [formData, setFormData] = useState<IFormData>(EMPTY_FORM);

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    return (
        <form
            className="flex flex-col gap-2"
            action={() => action(formData)}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                        name="name"
                        type="text"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                    />
                </div>

                <IncludeIngredientForm
                    initialIngredientSelectList={initialListOfAllIngredients}
                    onAdd={(newIngredient) => {
                        const newIngredients = [...formData.ingredients];
                        if (!newIngredient.ingredient) {
                            alert('Please select an ingredient.');
                            return;
                        };
                        newIngredients.push({
                            ingredient: newIngredient.ingredient,
                            amount: newIngredient.amount ?? 0,
                        });
                        setFormData({ ...formData, ingredients: newIngredients });
                    }}
                />
                <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-left px-3 py-1.5">
                                    Ingredient
                                </th>
                                <th scope="col" className="text-right px-3 py-1.5">
                                    Amount
                                </th>
                                <th scope="col" className="text-right px-3 py-1.5" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formData.ingredients.length === 0
                                    ? (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td colSpan={3} className="text-center p-3">
                                                No ingredients added yet.
                                            </td>
                                        </tr>
                                    )
                                    : (
                                        formData.ingredients.map((ingredient) => {
                                            return (
                                                <tr key={ingredient.ingredient.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-3 py-2">
                                                        {ingredient.ingredient.name}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {`${ingredient.amount} ${ingredient.ingredient.units ?? ''}`}
                                                    </td>
                                                    <td className="p-2 flex justify-end">
                                                        <Button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const newIngredients = [...formData.ingredients];
                                                                const index = newIngredients.findIndex((i) => i.ingredient.id === ingredient.ingredient.id);
                                                                newIngredients.splice(index, 1);
                                                                setFormData({ ...formData, ingredients: newIngredients });
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        )
                                    )
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center">
                    <Button>
                        Save
                    </Button>
                </div>
            </div>

        </form>
    );
}