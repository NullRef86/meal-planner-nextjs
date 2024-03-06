// ---- Temp Imports until nextjs 14 supports these polyfills ----
import "core-js/features/array/to-sorted";
// --------------------------------------------------------------------

import Input from "@/app/_components/Input";
import { Button } from "@/app/_components/client-components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ingredient } from "@prisma/client";
import { useContext, useMemo, useRef, useState } from "react";
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

    interface IGroupedOptions {
        label: string;
        options: IOption[];
    }
    interface IOption {
        value: string;
        label: string;
        displayElement?: JSX.Element;
    }

    const groupedOptions: IGroupedOptions[] = useMemo(() => {
        const actionsOptionGroup: IGroupedOptions = {
            label: 'Actions',
            options: [
                {
                    value: NEW_INGREDIENT_OPTION_KEY,
                    label: 'Add New Ingredient',
                }
            ]
        };


        return [
            ...groupBy(ingredientsSelectList, (ingredient) => ingredient.category)
                .sort(([a], [b]) => compareNullableStrings(a, b))
                .map(([category, ingredients]) => {
                    const options: IOption[] = ingredients
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((ingredient) => (
                            {
                                value: ingredient.id.toString(),
                                label: ingredient.name,
                                displayElement: <span>{ingredient.name}{ingredient.units ? <span className="italic text-gray-400 text-xs ms-2"> {ingredient.units}</span> : <></>}</span>
                            }
                        ));

                    const groupedOptions: IGroupedOptions = {
                        label: category ?? 'Uncategorised',
                        options
                    }

                    return groupedOptions;
                }),
            actionsOptionGroup
        ];
    }, [ingredientsSelectList]);

    const showAddIngredientModal = () => {
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

                        amountInput?.current?.focus();
                    }}
                />
            )
        });
    };

    var ingredientSelect = useRef<any>(null);
    var amountInput = useRef<any>(null);

    return (
        <>
            <div className="flex gap-4">

                <div className="w-2/3">
                    <label>Ingredient:</label>
                    <ReactSelect
                        ref={ingredientSelect}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        instanceId={'ingredient'}
                        options={groupedOptions}
                        formatOptionLabel={(option: IOption) => option.displayElement ?? option.label}
                        value={
                            groupedOptions.find(option => option.label === formData.ingredient?.category)
                                ?.options.find(option => option.value === formData.ingredient?.id.toString())
                            ?? null
                        }
                        filterOption={(option, rawInput) => {
                            const input = rawInput.toLowerCase();
                            return option.value === NEW_INGREDIENT_OPTION_KEY || option.label.toLowerCase().includes(input);
                        }}
                        onChange={(newValue: SingleValue<{
                            value: number;
                            label: JSX.Element;
                        } | {
                            value: string;
                            label: string;
                        }
                        >) => {
                            if (newValue?.value === NEW_INGREDIENT_OPTION_KEY) {
                                showAddIngredientModal();
                                return;
                            }

                            setFormData({
                                ...formData,
                                ingredient: ingredientsSelectList?.find((ingredient) => ingredient.id === Number(newValue?.value))
                            });
                        }}
                    />
                </div>

                <div className="w-1/3">
                    <label>Amount:</label>
                    <Input
                        name="amount"
                        type="number"
                        ref={amountInput}
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
                            ingredientSelect?.current?.focus();
                        }}>
                        <FontAwesomeIcon icon={faPlus} className="text-xl" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default IncludeIngredientForm;