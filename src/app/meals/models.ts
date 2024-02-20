import { Ingredient, Meal, RecipeIngredient } from "@prisma/client";

export type MealWithIngredients = (
    Meal
    &
    {
        ingredients: (
            {
                ingredient: Ingredient;
            }
            & RecipeIngredient
        )[];
    }
);