'use client';

import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Ingredient, Meal, MealEntity, MealIngrendient } from '@/models';

// ---- Temp Imports until nextjs 14 supports these polyfills ----
// import "core-js/features/array/to-reversed";
// import "core-js/features/array/to-spliced";
import "core-js/features/array/to-sorted";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { is } from 'core-js/core/object';
// --------------------------------------------------------------------

interface IAddIngredientFormProps {
    disabled: boolean;
    ingredients: Ingredient[];
    onAdd: (ingredient: MealIngrendient) => void;
}

const AddIngredientForm = ({
    disabled,
    ingredients,
    onAdd
}: IAddIngredientFormProps) => {
    interface IFormData {
        ingredient?: Ingredient;
        amount?: number;
    }

    const [formData, setFormData] = useState<IFormData>({});

    return (
        <div className='add-form'>
            {
                <select
                    disabled={disabled}
                    name="ingredient"
                    onChange={(e) => setFormData({ ...formData, ingredient: ingredients!.find((ingredient) => ingredient.id === e.target.value) })}
                    value={formData.ingredient?.id ?? ''}
                >
                    {
                        <>
                            <option value="">
                                Select ingredient...
                            </option>
                            {
                                ingredients!
                                    .toSorted((a, b) => a.name.localeCompare(b.name))
                                    .map((ingredient) => {
                                        return (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        );
                                    })
                            }
                        </>
                    }
                </select>
            }

            <label>
                Amount:
                <input
                    name="amount"
                    type="number"
                    disabled={disabled}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                    value={formData.amount ?? ''}
                />
                {
                    formData.ingredient && (
                        <span>
                            {formData.ingredient?.units}
                        </span>
                    )
                }


            </label>
            <button
                disabled={disabled || !formData.ingredient}
                onClick={(e) => {
                    e.preventDefault();
                    if (!formData.ingredient) return;
                    onAdd({
                        ingredient: formData.ingredient,
                        amount: formData.amount ?? 0,
                    });
                    setFormData({});
                }}>
                Add
            </button>
        </div>
    );
}

interface IProps {
    ingredients: Ingredient[];
}

const Form = ({ ingredients }: IProps) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const EMPTY_FORM = {
        name: '',
        ingredients: [],
    }

    interface IFormData {
        name: string;
        ingredients: MealIngrendient[];
    }

    const [formData, setFormData] = useState<IFormData>(EMPTY_FORM);

    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery<MealEntity>(
        ['meal', id],
        async () => {
            if (!id) return;
            const response = await fetch(`/api/meals/${id}`);
            return await response.json();
        }
    );

    useEffect(() => {
        if (!data) return;
        const meal = {
            id: data.id,
            name: data.name,
            ingredients: data.ingredients.map((mealIngrendient) => {
                return {
                    ingredient: ingredients.find((ingredient) => ingredient.id === mealIngrendient.ingredientId)!,
                    amount: mealIngrendient.amount,
                };
            })
        }

        // data.ingredients.forEach((mealIngrendient) => {
        //     console.log('mealIngrendient', mealIngrendient);
        //     const ingredient = ingredients.find((ingredient) => ingredient.id === mealIngrendient.ingredientId);

        //     if (!ingredient) throw new Error(`Ingredient ${mealIngrendient.ingredientId} not found.`);

        //     mealIngrendient.ingredient = ingredient;
        // });

        setFormData(meal);
    }, [data]);

    const { mutate: upsert, isLoading: isSaving } = useMutation({
        mutationFn: () => {
            // if (!formData.category) {
            //     throw new Error('Please select a category.');
            // }
            const body = JSON.stringify(formData);

            if (id) {
                return fetch(`/api/meals/${id}`, {
                    method: 'PATCH',
                    body
                });
            }
            else {
                return fetch('/api/meals', {
                    method: 'POST',
                    body
                })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'meals' });
            navigate('/meals');
        },
        onError: (error: any) => alert(error)
    });

    const isFormDisabled = useMemo(() => isFetching || isSaving, [isFetching, isSaving]);

    return (
        <>
            <div className='form-field'>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    type="text"
                    disabled={isFormDisabled}
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
                                            {`${ingredient.amount} ${ingredient.ingredient.units}`}
                                        </td>
                                        <td>
                                            <button
                                                disabled={isFormDisabled}
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
                </tbody>
            </table>

            <AddIngredientForm
                disabled={isFormDisabled}
                ingredients={ingredients}
                onAdd={(newIngredient) => {
                    const newIngredients = [...formData.ingredients];

                    newIngredients.push({
                        ingredient: newIngredient.ingredient,
                        amount: newIngredient.amount,
                    });

                    setFormData({ ...formData, ingredients: newIngredients });
                }}
            />

            <button
                disabled={isFormDisabled}
                type="submit"
                onClick={() => { upsert(); }}
            >
                {
                    isSaving
                        ? 'Saving...'
                        : 'Save'
                }
            </button>
        </>
    );
};

const FormWrapper = () => {
    const { data: ingredients, isFetching } = useQuery<Ingredient[]>(
        'ingredients',
        async () => {
            const response = await fetch('/api/ingredients');
            return await response.json() ?? [];
        }
    );

    //const { id } = useParams();

    // const { isFetching: d } = useQuery(
    //     ['meal', id],
    //     async () => {
    //         console.log('Fetching...?');

    //         // if (!id) return;

    //         // //console.log('Fetching meal', 'START');
    //         // const response = await fetch(`/api/meals/${id}`);
    //         // //console.log('Fetching meal', 'END');

    //         // const mealEntity = await response.json() as Meal;

    //         // //console.log('mealEntity', mealEntity);

    //         // mealEntity.ingredients.forEach((mealIngrendient) => {
    //         //     const ingredient = ingredients.find((ingredient) => ingredient.id === mealIngrendient.ingredient.id);

    //         //     if (!ingredient) throw new Error(`Ingredient ${mealIngrendient.ingredient.id} not found.`);

    //         //     mealIngrendient.ingredient = ingredient;
    //         // });

    //         // setFormData(mealEntity);
    //     }
    // );

    let content = useMemo(() => {
        {

            if (isFetching) {
                return <div>Loading ingredients...</div>;
            }

            if (!ingredients) {
                return <div>Something went wrong.</div>;
            }

            return <Form ingredients={ingredients} />;
        }
    }, [ingredients, isFetching]);

    return (
        <main className="add-meal-page">
            <div className='title'>
                <h1>
                    Add Meal
                </h1>
                <Link to={'/meals'}>
                    Back to Meals
                </Link>
            </div>

            {content}

        </main>
    )
}


export default FormWrapper;