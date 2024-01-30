import { Ingredient } from "@/models";

export const getIngredients = async () => {
    const response = await fetch('/api/ingredients');
    return await response.json() ?? [];
}