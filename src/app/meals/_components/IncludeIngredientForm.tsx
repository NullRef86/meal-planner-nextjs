// ---- Temp Imports until nextjs 14 supports these polyfills ----
import "core-js/features/array/to-sorted";
// --------------------------------------------------------------------

import Input from "@/app/_components/Input";
import { Select } from "@/app/_components/Select";
import { Button } from "@/app/_components/client-components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ingredient } from "@prisma/client";
import { useContext, useState } from "react";
import { default as IngredientForm } from "@/app/ingredients/_components/Form";
import { addIngredient, getIngredients } from "@/app/ingredients/actions";
import { ModalContext } from "@/app/_components/Main";

interface IProps {
    initialIngredientSelectList: Ingredient[];
    onAdd: (ingredient: IFormData) => void;
}

export interface IFormData {
    ingredient?: Ingredient;
    amount?: number;
}

const IncludeIngredientForm = ({
    initialIngredientSelectList,
    onAdd
}: IProps) => {

    const [formData, setFormData] = useState<IFormData>({});

    const modalContext = useContext(ModalContext);

    const [ingredientsSelectList, setIngredientsSelectList] = useState(initialIngredientSelectList);

    return (
        <>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label>Ingredient:</label>
                    <Select
                        name="ingredient"
                        onChange={(e) => {
                            if (e.target.value === '--New--') {
                                modalContext.show({
                                    title: 'Add New Ingredient',
                                    content: (
                                        <IngredientForm
                                            action={async (formData) => {
                                                addIngredient(formData);

                                                const updatedIngredientsList = await getIngredients();

                                                setIngredientsSelectList(updatedIngredientsList);
                                                setFormData({
                                                    ...formData,
                                                    ingredient: updatedIngredientsList.find(i => i.name === formData.get('name'))
                                                });

                                                modalContext.hide();
                                            }}
                                        />
                                    )
                                });
                                return;
                            }

                            setFormData({
                                ...formData,
                                ingredient: ingredientsSelectList?.find((ingredient) => ingredient.id === Number(e.target.value))
                            });
                        }}
                        value={formData.ingredient?.id ?? ''}
                    >
                        {
                            <>
                                <option value="">
                                    Select...
                                </option>
                                <option value="--New--">
                                    -- New Ingredient --
                                </option>
                                {
                                    ingredientsSelectList
                                        .toSorted((a, b) => a.name.localeCompare(b.name))
                                        .map((ingredient) => {
                                            return (
                                                <option
                                                    key={ingredient.id}
                                                    value={ingredient.id}
                                                >
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
                        <FontAwesomeIcon icon={faPlus} className="text-xl" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default IncludeIngredientForm;