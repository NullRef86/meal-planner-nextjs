import Link from 'next/link';
import React, { useEffect } from 'react';

interface IProps {
    initialFormData?: IFormData;
    disabled: boolean;
    onSave: (formData: IFormData) => void;
}

export interface IFormData {
    name: string;
    units: string;
    category: string;
}

const Form = ({ initialFormData, disabled, onSave }: IProps) => {
    const EMPTY_FORM: IFormData = {
        name: '',
        units: '',
        category: ''
    };
    const [formData, setFormData] = React.useState<IFormData>(EMPTY_FORM);

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    useEffect(() => {
        console.log('formData', formData);
    }, [formData]);

    return (
        <main className='ingredient-form-page'>
            <div className='title'>
                <h1>
                    Ingredients
                </h1>
                <Link href={'/ingredients'}>
                    Back
                </Link>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={formData.name}
                    disabled={disabled}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <label htmlFor="units">Units</label>
                <input
                    id="units"
                    value={formData.units}
                    disabled={disabled}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                />

                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={formData.category}
                    disabled={disabled}
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
                    disabled={disabled}
                    type="submit"
                    onClick={() => { onSave(formData); }}
                >
                    Save
                </button>
            </div>
        </main>
    );
};

export default Form;