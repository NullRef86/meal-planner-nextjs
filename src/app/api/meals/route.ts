import { Meal, MealEntity } from '@/models';
import { getBlobContent, saveBlobContent } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

const FILE_NAME = 'meals.json';

export async function GET(request: Request) {
    const data = await getBlobContent<MealEntity>(FILE_NAME);

    return Response.json(data);
}

export async function POST(request: Request, response: Response) {
    const newMeal = await request.json() as Meal;

    const data = await getBlobContent<MealEntity>(FILE_NAME);

    data.push({
        id: uuidv4(),
        name: newMeal.name,
        ingredients: newMeal.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredient.id,
            amount: ingredient.amount,
        })),
    });

    await saveBlobContent<MealEntity>(FILE_NAME, data);

    return Response.json(newMeal);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const data = await getBlobContent<MealEntity>(FILE_NAME);

    const newData = data.filter(item => item.id !== id);

    await saveBlobContent<MealEntity>(FILE_NAME, newData);

    return Response.json(newData);
}
