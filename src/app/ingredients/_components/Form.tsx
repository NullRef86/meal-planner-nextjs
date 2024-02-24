import { Ingredient } from "@prisma/client";
import { Button } from "../../_components/client-components/Button";
import Input from "../../_components/Input";
import { Select } from "../../_components/Select";

interface IProps {
    action: (formData: FormData) => void;
    ingredient?: Ingredient | null;
}

export default function Form({ action, ingredient }: IProps) {
    return (
        <form
            className="flex flex-col gap-2"
            action={action}
        >
            {
                ingredient &&
                <input
                    type="hidden"
                    name="id"
                    value={ingredient.id}
                />
            }

            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                        name="name"
                        defaultValue={ingredient?.name}
                    />
                </div>

                <div>
                    <label htmlFor="units">Units</label>
                    <Input
                        name="units"
                        placeholder="item"
                        defaultValue={ingredient?.units}
                    />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <Select
                        name="category"
                        defaultValue={ingredient?.category}
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
                    </Select>
                </div>
                <div className="flex justify-center">
                    <Button className="text-3xl">
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
}