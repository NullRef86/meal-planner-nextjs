import React, { Fragment } from 'react';
import { Ingredient, MealEntity } from '@/models';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const List = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const [mealsQuery, ingredientsQuery] = useQueries([
        {
            queryKey: 'meals',
            queryFn: async () => {
                const response = await fetch('/api/meals');
                return await response.json() as MealEntity[] ?? [];
            }
        },
        {
            queryKey: 'ingredients',
            queryFn: async () => {
                const response = await fetch('/api/ingredients');
                return await response.json() as Ingredient[] ?? [];
            }
        }
    ])

    const { mutate: remove, isLoading: isRemoving } = useMutation({
        mutationFn: (id: string) => {
            return fetch(
                `/api/meals`,
                {
                    method: 'DELETE',
                    body: JSON.stringify({ id })
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'meals' });
        }
    });

    let content;

    if (mealsQuery.isFetching || ingredientsQuery.isFetching) {
        content = <div>Loading...</div>;
    }
    else {
        content = (
            <div className='meals'>
                {
                    mealsQuery.data!
                        .map((meal) => (
                            <div
                                className='meal' key={meal.id}
                                onClick={() => navigate(`/meals/form/${meal.id}`)}
                            >
                                <h4>
                                    {meal.name}
                                    <button disabled={isRemoving} onClick={() => remove(meal.id)}>
                                        X
                                    </button>
                                </h4>
                                <div className='ingredients'>
                                    {
                                        meal.ingredients.map((entity) => {
                                            const ingredient = ingredientsQuery.data!.find((i) => i.id === entity.ingredientId)!;
                                            if (!ingredient) return <div>[Unknown]</div>;
                                            let unit = '';
                                            if (ingredient.units !== 'Item') {
                                                unit = ingredient.units + ' of';
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
                <Link to={'/'}>
                    Back to Home
                </Link>
                <Link to={'/meals/form'}>
                    Add New Meal
                </Link>
            </div>
            {content}
        </main >
    );
};

export default List;
