import React from 'react';
import styles from './page.module.css'

import ingredients from '../../../data/ingredients.json';
import AddForm from './components/addForm';
import Link from 'next/link';

const Ingredients = () => {

    return (
        <main>
            <div className='title'>
                <h1>
                    Ingredients
                </h1>
                <Link href={'/'}>
                    Back to Home
                </Link>
            </div>
            <AddForm />
            <ul>
                {
                    ingredients
                        .reverse()
                        .map((ingredient) => {
                            return (
                                <li key={ingredient.id}>
                                    {ingredient.name}
                                </li>
                            );
                        })
                }
            </ul>
        </main >
    );
};

export default Ingredients;
