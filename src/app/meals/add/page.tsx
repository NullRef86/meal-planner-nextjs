'use client';

import allIngredients from '../../../../data/ingredients.json';

import React, { FormEvent, use, useEffect, useState } from 'react';
import { Ingredient, Meal, MealIngrendient } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
    onAdd: (ingredient: MealIngrendient) => void;
}

const AddIngredientRow = ({
    onAdd
}: IProps) => {
    interface IFormData {
        ingredient?: Ingredient;
        amount: number;
    }

    const [formData, setFormData] = useState<IFormData>({
        amount: 0,
    });

    return (
        <tr>
            <td>
                <div style={{ display: 'flex' }}>
                    <select
                        name="ingredient"
                        onChange={(e) => setFormData({ ...formData, ingredient: allIngredients.find((ingredient) => ingredient.id === e.target.value) })}
                        value={formData.ingredient?.id ?? ''}
                    >
                        <option value="">
                            Select
                        </option>
                        {
                            ([...allIngredients] as Ingredient[])
                                .toSorted((a, b) => a.name.localeCompare(b.name))
                                .map((ingredient) => {
                                    return (
                                        <option key={ingredient.id} value={ingredient.id}>
                                            {ingredient.name}
                                        </option>
                                    );
                                })
                        }
                    </select>
                </div>
            </td>
            <td className="amount-cell">
                <div>
                    <input
                        name="amount"
                        type="number"
                        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                        value={formData.amount}
                    />
                    <span>
                        {formData.ingredient?.unit}
                    </span>
                </div>
            </td>
            <td>
                <button
                    disabled={!formData.ingredient}
                    onClick={(e) => {
                        e.preventDefault();
                        if (!formData.ingredient) return;
                        onAdd({
                            ingredient: formData.ingredient,
                            amount: formData.amount,
                        });
                        setFormData({
                            amount: 0,
                        });
                    }}>
                    Add
                </button>
            </td>
        </tr >
    );
}


const AddForm = () => {

    interface IFormData {
        name: string;
        ingredients: MealIngrendient[];
    }

    const [formData, setFormData] = useState<IFormData>({
        name: '',
        ingredients: [],
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(formData)

        await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        window.location.href = '/meals';
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <main className="add-meal-page">
            <form onSubmit={onSubmit}>
                <div className='title'>
                    <h1>
                        Add Meal
                    </h1>
                    <Link href={'/meals'}>
                        Back to Meals
                    </Link>
                </div>

                <div className='form-field'>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type="text"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                    />
                </div>

                <table >
                    <thead>
                        <tr>
                            <th>
                                Ingredient
                            </th>
                            <th className='amount-cell'>
                                Amount
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formData.ingredients.length > 0 && (
                                formData.ingredients.map((ingredient) => {
                                    return (
                                        <tr key={ingredient.ingredient.id}>
                                            <td>
                                                {ingredient.ingredient.name}
                                            </td>
                                            <td className="amount-cell">
                                                {`${ingredient.amount} ${ingredient.ingredient.unit}`}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const newIngredients = [...formData.ingredients];
                                                        const index = newIngredients.findIndex((i) => i.ingredient.id === ingredient.ingredient.id);
                                                        newIngredients.splice(index, 1);
                                                        setFormData({ ...formData, ingredients: newIngredients });
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                                )
                            )
                        }
                        <AddIngredientRow
                            onAdd={(newIngredient) => {
                                const newIngredients = [...formData.ingredients];

                                newIngredients.push({
                                    ingredient: newIngredient.ingredient,
                                    amount: newIngredient.amount,
                                });

                                setFormData({ ...formData, ingredients: newIngredients });
                            }}
                        />
                    </tbody>
                </table>

                <button type="submit">
                    Save Meal
                </button>




            </form>
        </main>
    );
};

export default AddForm;