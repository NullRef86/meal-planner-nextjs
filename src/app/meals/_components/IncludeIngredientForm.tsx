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
import { EMPTY_CATEGORY_VALUE, default as IngredientForm } from "@/app/ingredients/_components/Form";
import { addIngredient, getIngredients } from "@/app/ingredients/actions";
import { ModalContext } from "@/app/_components/Main";
import { compareNullableStrings, groupBy } from "@/utils";

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

    const DEFAULT_AMOUNT = 1;
    const DEFAULT_FORM = {};

    const [formData, setFormData] = useState<IFormData>(DEFAULT_FORM);

    const modalContext = useContext(ModalContext);

    const [ingredientsSelectList, setIngredientsSelectList] = useState(initialIngredientSelectList);

    const NEW_INGREDIENT_OPTION_KEY = '--New--';

    return (
        <>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label>Ingredient:</label>
                    <Select
                        name="ingredient"
                        onChange={(e) => {
                            if (e.target.value === NEW_INGREDIENT_OPTION_KEY) {
                                modalContext.show({
                                    title: 'Add New Ingredient',
                                    content: (
                                        <IngredientForm
                                            action={async (formData) => {
                                                addIngredient(formData, true);

                                                const updatedIngredientsList = await getIngredients();

                                                setIngredientsSelectList(updatedIngredientsList);
                                                setFormData({
                                                    ...DEFAULT_FORM,
                                                    ingredient: updatedIngredientsList.find(i => i.name === formData.get('name')),
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
                        <option value="">
                            Select...
                        </option>
                        <option value={NEW_INGREDIENT_OPTION_KEY}>
                            Add New Ingredient
                        </option>
                        {
                            groupBy(ingredientsSelectList, (ingredient) => ingredient.category)
                                .sort(([a], [b]) => compareNullableStrings(a, b))
                                .map(([category, ingredients]) => (
                                    <optgroup key={category} label={category ?? EMPTY_CATEGORY_VALUE}>
                                        {
                                            ingredients
                                                .sort((a, b) => a.name.localeCompare(b.name))
                                                .map((ingredient) => (
                                                    <option
                                                        key={ingredient.id}
                                                        value={ingredient.id}
                                                    >
                                                        {ingredient.name}{ingredient.units ? ` (${ingredient.units})` : ''}
                                                    </option>
                                                ))
                                        }
                                    </optgroup>
                                ))
                        }
                    </Select>
                </div>

                <div className="w-1/2">
                    <label>Amount:</label>
                    <Input
                        name="amount"
                        type="number"
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                        value={formData.amount ?? ''}
                        placeholder={DEFAULT_AMOUNT.toString()}
                    />
                </div>
                <div className="flex items-end pb-px">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (!formData.ingredient) return;
                            onAdd({
                                ingredient: formData.ingredient,
                                amount: formData.amount ?? DEFAULT_AMOUNT,
                            });
                            setFormData(DEFAULT_FORM);
                        }}>
                        <FontAwesomeIcon icon={faPlus} className="text-xl" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default IncludeIngredientForm;