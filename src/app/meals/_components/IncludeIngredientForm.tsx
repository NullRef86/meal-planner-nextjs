// ---- Temp Imports until nextjs 14 supports these polyfills ----
import "core-js/features/array/to-sorted";
// --------------------------------------------------------------------

import Input from "@/app/_components/Input";
import { Button } from "@/app/_components/client-components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ingredient } from "@prisma/client";
import { useContext, useMemo, useState } from "react";
import { default as IngredientForm } from "@/app/ingredients/_components/Form";
import { addIngredient, getIngredients } from "@/app/ingredients/actions";
import { ModalContext } from "@/app/_components/Main";
import { compareNullableStrings, groupBy } from "@/utils";
import ReactSelect, { SingleValue } from "react-select";

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

    const groupedOptions = useMemo(() => {
        return [
            {
                label: 'Actions',
                options: [
                    {
                        value: NEW_INGREDIENT_OPTION_KEY,
                        label: 'Add New Ingredient',
                    }
                ]
            },
            ...groupBy(ingredientsSelectList, (ingredient) => ingredient.category)
                .sort(([a], [b]) => compareNullableStrings(a, b))
                .map(([category, ingredients]) => {
                    const options = ingredients
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((ingredient) => (
                            {
                                value: ingredient.id,
                                label: <span>{ingredient.name}{ingredient.units ? <span className="italic dark:text-gray-400 text-xs"> {ingredient.units}</span> : <></>}</span>,
                            }
                        ));

                    return (
                        category
                            ? ({
                                label: category,
                                options
                            })
                            : ({
                                label: 'Uncategorised',
                                options
                            })
                    );
                })
        ];
    }, [ingredientsSelectList]);

    return (
        <>
            <div className="flex gap-4">

                <div className="w-1/2">
                    <label>Ingredient:</label>
                    <ReactSelect
                        className="react-select-container"
                        classNamePrefix="react-select"
                        instanceId={'ingredient'}
                        options={groupedOptions}
                        value={
                            groupedOptions.find(option => option.label === formData.ingredient?.category)
                                ?.options.find(option => option.value === formData.ingredient?.id)
                            ?? null
                        }
                        onChange={(newValue: SingleValue<{
                            value: number;
                            label: JSX.Element;
                        } | {
                            value: string;
                            label: string;
                        }
                        >) => {
                            if (newValue?.value === NEW_INGREDIENT_OPTION_KEY) {
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
                                ingredient: ingredientsSelectList?.find((ingredient) => ingredient.id === Number(newValue?.value))
                            });
                        }}
                    />
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