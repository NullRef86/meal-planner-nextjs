'use client';

import { Ingredient } from '@/models';
import Link from 'next/link';
import React, { FormEvent, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Form, { IFormData } from './(components)/_form';

const View = () => {
    const queryClient = useQueryClient();

    const { mutate: add, isLoading: isAdding } = useMutation({
        mutationFn: (formData: IFormData) => {
            if (!formData.category) {
                throw new Error('Please select a category.');
            }
            const body = JSON.stringify(formData);

            return fetch('/api/ingredients', {
                method: 'POST',
                body
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'ingredients' });
            window.location.href = '/ingredients';
        },
        onError: (error: any) => alert(error)
    });

    return (
        <Form
            //disabled={isFormDisabled}
            disabled={isAdding}
            onSave={add}
        />
    );
};

export default View;