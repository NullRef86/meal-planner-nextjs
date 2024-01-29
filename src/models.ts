
export interface Ingredient {
    id: string;
    name: string;
    units: string;
    category: string;
}

export interface MealIngrendient {
    ingredient: Ingredient;
    amount: number;
}

export interface Meal {
    id: string;
    name: string;
    ingredients: MealIngrendient[];
}

export interface MealEntity {
    id: string;
    name: string;
    ingredients: MealIngredientEntity[];
}

export interface IngredientEntity {
    id: string;
    name: string;
    unit: string;
    category: string;
}

export interface MealIngredientEntity {
    ingredientId: string;
    amount: number;
}