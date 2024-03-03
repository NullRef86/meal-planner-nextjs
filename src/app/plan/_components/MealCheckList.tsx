'use client'

import Checkbox from "@/app/_components/Checkbox";
import { MealWithIngredients } from "@/app/meals/models";
import { groupBy } from "@/utils";
import { useMemo, useState } from "react";

interface IProps {
    meals: MealWithIngredients[];
}

interface GroupedIngredient {
    id: number;
    name: string;
    category: string | null;
    units: string | null;
    amountTotal: number;
    label: string;
    isDeselected: boolean;
};

export default function MealCheckList({ meals }: IProps) {

    const [selectedMeals, setSelectedMeals] = useState<MealWithIngredients[]>([]);
    const [deselectedIds, setDeselectedIds] = useState<number[]>([]);

    const ingredients: GroupedIngredient[] = useMemo(() => {
        const distinct = (
            selectedMeals
                .map(x => x.ingredients)
                .flat()
        );

        const groupedByName = groupBy(distinct, mealIngredient => mealIngredient.ingredient.name);

        const newArray = groupedByName.map(groupedIngredient => {
            const ingredient = groupedIngredient[1][0].ingredient;
            const amountTotal = parseFloat(
                groupedIngredient[1]
                    .reduce((acc, x) => acc + (x.amount ?? 1), 0)
                    .toFixed(2)
            );
            return {
                id: ingredient.id,
                name: ingredient.name,
                category: ingredient.category,
                units: ingredient.units,
                amountTotal,
                label: `${amountTotal} ${ingredient.units} ${ingredient.name}`,
                isDeselected: deselectedIds.some(x => x === ingredient.id),
            };
        });

        return newArray;
    }, [selectedMeals, deselectedIds]);

    const categories = useMemo(() => {
        return (
            ingredients
                .filter(ingredient => !deselectedIds.some(y => y === ingredient.id))
                .map(ingredient => ingredient.category)
                .filter((value, index, self) => self.indexOf(value) === index)
                .flat()
        );
    }, [ingredients, deselectedIds]);

    return (
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2">
                {
                    meals.map((meal) => (
                        <li key={meal.id}>
                            <div className="
                                flex 
                                items-center 
                                ps-4
                                p-1
                                w-auto
                                bg-white 
                                border
                                border-gray-200
                                rounded-lg 
                                shadow
                                hover:bg-gray-100
                                dark:bg-gray-800
                                dark:border-gray-700 
                                dark:hover:bg-gray-700
                            ">
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedMeals([...selectedMeals, meal]);
                                        } else {
                                            setSelectedMeals(selectedMeals.filter((selectedMeal) => selectedMeal.id !== meal.id));
                                        }
                                    }}
                                >
                                    {meal.name}
                                </Checkbox>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                categories
                    .map((category, index) => (
                        <div key={index}>
                            <div>{category}</div>
                            <hr />
                            <ul>
                                {
                                    ingredients
                                        .filter(ingredient => ingredient.category === category)
                                        .filter(ingredient => !deselectedIds.some(y => y === ingredient.id))
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((ingredient, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="flex items-center ps-3">
                                                        <Checkbox
                                                            checked
                                                            onChange={() => {
                                                                setDeselectedIds([
                                                                    ...deselectedIds.filter(x => x !== ingredient.id),
                                                                    ingredient.id
                                                                ]);
                                                            }}
                                                        >
                                                            {ingredient.label}
                                                        </Checkbox>
                                                    </div>
                                                </li>
                                            )
                                        })
                                }
                            </ul>
                        </div>
                    ))
            }
            {
                deselectedIds.length > 0
                && (
                    <div className="text-gray-500">
                        <div>
                            <div className='header'>Deselected
                                <hr />
                            </div>
                            <ul>
                                {
                                    deselectedIds
                                        .map((id) => ingredients.find(x => x.id === id)!)
                                        .filter(ingredient => ingredient)
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((ingredient, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="flex items-center ps-3">
                                                        <Checkbox
                                                            checked={false}
                                                            onChange={() => {
                                                                setDeselectedIds(deselectedIds.filter(id => id !== ingredient.id));
                                                            }}
                                                            strikethrough
                                                        >
                                                            {ingredient.label}
                                                        </Checkbox>
                                                    </div>
                                                </li>
                                            )
                                        })
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}