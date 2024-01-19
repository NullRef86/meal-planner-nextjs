'use client';

import React, { Fragment, useEffect, useState } from 'react';
import ingredients from '../../../data/ingredients.json';
import { MealEntity } from '@/models';
import Link from 'next/link';


const Meals = () => {
    const [meals, setMeals] = useState<MealEntity[]>([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const func = async () => {
            const response = await fetch('/api/meals');

            const data = await response.json();

            setMeals(data);
            setLoading(false);
        }
        func();
    }, []);

    let content;

    const removeMeal = async (id: string) => {
        setLoading(true);
        const response = await fetch(
            `/api/meals`,
            {
                method: 'DELETE',
                body: JSON.stringify({ id })
            }
        )

        const data = await response.json();

        setMeals(data);
        setLoading(false);
    }


    if (isLoading) {
        content = <div>Loading...</div>;
    }
    else {
        content = (
            <div className='meals'>
                {
                    (meals ?? [])
                        .map((meal) => (
                            <div className='meal' key={meal.id}>
                                <h4>
                                    {meal.name}
                                    <button onClick={() => removeMeal(meal.id)}>
                                        X
                                    </button>
                                </h4>
                                <div className='ingredients'>
                                    {
                                        meal.ingredients.map((entity) => {
                                            const ingredient = ingredients.find((i) => i.id === entity.ingredientId)!;
                                            let unit = '';
                                            if (ingredient.unit !== 'Item') {
                                                unit = ingredient.unit + ' of';
                                            }
                                            return (
                                                <Fragment key={ingredient.id}>
                                                    <div className='amount'>
                                                        {entity.amount} {unit}
                                                    </div>
                                                    <div>
                                                        {ingredient.name}
                                                    </div>
                                                </Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        );
    }

    return (
        <main className="meals-page">
            <div className='title'>
                <h1>
                    Meals
                </h1>
                <Link href={'/'}>
                    Back to Home
                </Link>
                <Link href={'/meals/add'}>
                    Add New Meal
                </Link>
            </div>
            {content}
        </main >
    );
};

export default Meals;
