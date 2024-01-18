import React, { Fragment } from 'react';
import styles from './page.module.scss'

import meals from '../../../data/meals.json';
import ingredients from '../../../data/ingredients.json';
import { Meal, MealEntity } from '@/models';
import AddForm from './add/page';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Meals = () => {
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
            <div className='meals'>
                {
                    [...(meals as MealEntity[])]
                        .reverse()
                        .map((meal) => {
                            return (
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
                            );
                        })
                }
            </div>
        </main >
    );
};

export default Meals;
