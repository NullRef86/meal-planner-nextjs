//export const dynamic = 'force-dynamic' // defaults to auto

import { Ingredient, Meal, MealEntity } from '@/models';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const jsonLocation = process.cwd() + '/data/meals.json';

export async function GET(request: Request) {
    const file = await fs.readFile(jsonLocation, 'utf8');

    const data = JSON.parse(file) as Ingredient[];

    return Response.json([data.reverse()]);
}

export async function POST(request: Request, response: Response) {
    const newMeal = await request.json() as Meal;
    console.log('newMeal', newMeal);
    const file = await fs.readFile(jsonLocation, 'utf8');
    const meals = JSON.parse(file) as MealEntity[];

    meals.push({
        id: uuidv4(),
        name: newMeal.name,
        ingredients: newMeal.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredient.id,
            amount: ingredient.amount,
        })),
    });

    await fs.writeFile(
        jsonLocation,
        JSON.stringify(meals, null, 4)
    );

    return Response.json(newMeal);


}
