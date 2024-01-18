'use client';
import styles from './addForm.module.css';

import React, { FormEvent } from 'react';

interface IProps {
}

const AddForm = ({ }: IProps) => {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/ingredients', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        })
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" />
            </div>
            <div>
                <label htmlFor="units">Units</label>
                <input id="units" name="units" type="text" />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input id="category" name="category" type="text" />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default AddForm;