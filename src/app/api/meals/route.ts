//export const dynamic = 'force-dynamic' // defaults to auto

import { Meal, MealEntity } from '@/models';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

const getBlobContent = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        const response = await fetch(
            'https://wkgafazl6buri7p4.public.blob.vercel-storage.com/meals.json',
            {
                headers: myHeaders,
            }
        );

        if (!response.ok) throw new Error(response.statusText);

        return await response.json() as MealEntity[];
    }
    catch (e) {
        console.log(e);
        return [] as MealEntity[];
    }
}

const saveBlobContent = async (data: MealEntity[]) => {
    const json = JSON.stringify(data, null, 4);
    await put('meals.json', json, {
        access: 'public',
        addRandomSuffix: false,
        cacheControlMaxAge: 0
    });
}

export async function GET(request: Request) {
    const data = await getBlobContent();

    return Response.json(data);
}

export async function POST(request: Request, response: Response) {
    const newMeal = await request.json() as Meal;

    const data = await getBlobContent();

    data.push({
        id: uuidv4(),
        name: newMeal.name,
        ingredients: newMeal.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredient.id,
            amount: ingredient.amount,
        })),
    });

    await saveBlobContent(data);

    return Response.json(newMeal);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const data = await getBlobContent();

    const newData = data.filter(meal => meal.id !== id);

    await saveBlobContent(newData);

    return Response.json(newData);
}
