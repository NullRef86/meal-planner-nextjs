import React, { useEffect, useState } from 'react';

// ---- Temp Imports until nextjs 14 supports these polyfills ----
// import "core-js/features/array/to-reversed";
// import "core-js/features/array/to-spliced";
import "core-js/features/array/to-sorted";
import { Ingredient } from '@/models';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
// --------------------------------------------------------------------

const List = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { data: ingredients, isFetching } = useQuery<Ingredient[]>(
        'ingredients',
        async () => {
            const response = await fetch('/api/ingredients');
            return await response.json() ?? [];
        }
    );

    const { mutate: remove, isLoading: isRemoving } = useMutation({
        mutationFn: (id: string) => {
            return fetch(
                `/api/ingredients`,
                {
                    method: 'DELETE',
                    body: JSON.stringify({ id })
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'ingredients' });
        }
    });

    let content;

    if (isFetching) {
        content = <div>Loading...</div>;
    }
    else if (!ingredients) {
        content = <div>Something went wrong.</div>;
    }
    else {
        content = (
            <div className="list">
                {
                    ingredients!
                        .toSorted((a, b) => a.name.localeCompare(b.name))
                        .map((ingredient) => {
                            return (
                                <div
                                    className='ingredient'
                                    key={ingredient.id}
                                    onClick={() => navigate(`/ingredients/form/${ingredient.id}`)}
                                >
                                    <div>
                                        {ingredient.name} | {ingredient.units} | {ingredient.category}
                                    </div>
                                    <button
                                        disabled={isRemoving}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            remove(ingredient.id);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })
                }
            </div>
        );
    }

    return (
        <main className="ingredients-page">
            <div className='title'>
                <h1>
                    Ingredients
                </h1>
                <Link to={'/'}>
                    Back to Home
                </Link>
            </div>
            <button onClick={() => navigate('/ingredients/form')}>
                Add New Ingredient
            </button>
            {content}
        </main >
    );
};

export default List;
