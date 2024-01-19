'use client';

import React, { Fragment, useEffect, useState } from 'react';
import ingredients from '../../../data/ingredients.json';
import { Meal } from '@/models';
import Link from 'next/link';


const Meals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/meals')
            .then((res) => res.json())
            .then((data) => {
                setMeals(data)
                setLoading(false)
            })
    }, []);

    let content;

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
