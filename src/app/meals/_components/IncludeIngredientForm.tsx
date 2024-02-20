import Input from "@/app/_components/Input";
import { Select } from "@/app/_components/Select";
import { Button } from "@/app/_components/client-components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface IProps {
    ingredients: Ingredient[];
    onAdd: (ingredient: IFormData) => void;
}

export interface IFormData {
    ingredient?: Ingredient;
    amount?: number;
}

const IncludeIngredientForm = ({
    ingredients,
    onAdd
}: IProps) => {

    const [formData, setFormData] = useState<IFormData>({});

    return (
        <>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label>Ingredient:</label>
                    <Select
                        name="ingredient"
                        onChange={(e) => setFormData({
                            ...formData,
                            ingredient: ingredients?.find((ingredient) => ingredient.id === Number(e.target.value))
                        })}
                        value={formData.ingredient?.id ?? ''}
                    >
                        {
                            <>
                                <option value="">
                                    Select...
                                </option>
                                {
                                    ingredients
                                        .toSorted((a, b) => a.name.localeCompare(b.name))
                                        .map((ingredient) => {
                                            return (
                                                <option key={ingredient.id} value={ingredient.id}>
                                                    {ingredient.name} ({ingredient.units})
                                                </option>
                                            );
                                        })
                                }
                            </>
                        }
                    </Select>
                </div>

                <div className="w-1/2">
                    <label>Amount:</label>
                    <Input
                        name="amount"
                        type="number"
                        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                        value={formData.amount ?? ''}
                    />
                </div>
                <div className="flex items-end pb-px">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (!formData.ingredient) return;
                            onAdd({
                                ingredient: formData.ingredient,
                                amount: formData.amount ?? 0,
                            });
                            setFormData({});
                        }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>
            </div>

        </>
    );
}

export default IncludeIngredientForm;