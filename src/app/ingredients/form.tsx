'use client';

import { Ingredient } from '@/models';
import { is } from 'core-js/core/object';
import React, { FormEvent, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Form = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const EMPTY_FORM = {
        name: '',
        units: '',
        category: ''
    };

    interface IFormData {
        name: string;
        units: string;
        category: string;
    }

    const [formData, setFormData] = React.useState<IFormData>(EMPTY_FORM);

    const queryClient = useQueryClient();

    const { isFetching } = useQuery(
        ['ingredient', id],
        async () => {

            console.log('Fetching ingredient START');
            if (!id) return;
            const response = await fetch(`/api/ingredients/${id}`);
            const ingredient = await response.json() as Ingredient;
            console.log('Fetching ingredient END', ingredient);
            setFormData(ingredient);
        }
    );

    const { mutate: upsert, isLoading: isSaving } = useMutation({
        mutationFn: () => {
            if (!formData.category) {
                throw new Error('Please select a category.');
            }
            const body = JSON.stringify(formData);

            if (id) {
                return fetch(`/api/ingredients/${id}`, {
                    method: 'PATCH',
                    body
                });
            }
            else {
                return fetch('/api/ingredients', {
                    method: 'POST',
                    body
                })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'ingredients' });
            navigate('/ingredients');
        },
        onError: (error: any) => alert(error)
    });

    const isFormDisabled = useMemo(() => isFetching || isSaving, [isFetching, isSaving]);

    return (
        <main className='ingredient-form-page'>
            <div className='title'>
                <h1>
                    Ingredients
                </h1>
                <Link to={'/ingredients'}>
                    Back
                </Link>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={formData.name}
                    disabled={isFormDisabled}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <label htmlFor="units">Units</label>
                <input
                    id="units"
                    value={formData.units}
                    disabled={isFormDisabled}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                />

                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={formData.category}
                    disabled={isFormDisabled}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option>Select...</option>
                    <option>Baking</option>
                    <option>Bread</option>
                    <option>Cupboard</option>
                    <option>Dairy</option>
                    <option>Freezer</option>
                    <option>Fridge</option>
                    <option>Meat</option>
                    <option>Veg</option>
                </select>
            </div>
            <div>
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
            </div>
        </main>
    );
};

export default Form;