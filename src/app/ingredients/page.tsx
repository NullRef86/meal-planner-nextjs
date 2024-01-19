import React from 'react';
import styles from './page.module.css'

import ingredients from '../../../data/ingredients.json';
import AddForm from './components/addForm';
import Link from 'next/link';

// ---- Temp Imports until nextjs 14 supports these polyfills ----
// import "core-js/features/array/to-reversed";
// import "core-js/features/array/to-spliced";
import "core-js/features/array/to-sorted";
// --------------------------------------------------------------------

const Ingredients = () => {

    return (
        <main className="ingredients-page">
            <div className='title'>
                <h1>
                    Ingredients
                </h1>
                <Link href={'/'}>
                    Back to Home
                </Link>
            </div>
            <AddForm />
            <div className="list">
                {
                    ingredients
                        .toSorted((a, b) => a.name.localeCompare(b.name))
                        .map((ingredient) => {
                            return (
                                <div className='ingredient' key={ingredient.id}>
                                    <div>
                                        {ingredient.name}
                                    </div>
                                    <div>
                                        <button>
                                            X
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                }
            </div>
        </main >
    );
};

export default Ingredients;
