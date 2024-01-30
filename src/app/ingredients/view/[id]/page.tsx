'use client';

import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import Form, { IFormData } from '../(components)/_form';
import { Ingredient } from '@/models';

interface IProps {
    params: { id: string };
}

const ViewById = (context: IProps) => {
    const { id } = context.params;

    const { data, isFetching } = useQuery<Ingredient>(
        ['ingredient', id],
        async () => {
            const response = await fetch(`/api/ingredients/${id}`);
            return await response.json();
        }
    );

    const { mutate: edit, isLoading: isEditing } = useMutation({
        mutationFn: async (formData: IFormData) => {
            if (!formData.category) {
                throw new Error('Please select a category.');
            }
            const body = JSON.stringify(formData);

            await fetch(`/api/ingredients/${id}`, {
                method: 'PATCH',
                body
            });
            window.location.href = '/ingredients';
        },
        onError: (error: any) => alert(error)
    });

    const isFormDisabled = useMemo(() => isFetching || isEditing, [isFetching, isEditing]);

    return (
        <Form
            initialFormData={data}
            disabled={isFormDisabled}
            onSave={edit}
        />
    );
};

export default ViewById;