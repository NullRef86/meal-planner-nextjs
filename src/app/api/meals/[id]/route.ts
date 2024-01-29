import { Ingredient, Meal, MealEntity } from '@/models';
import { getBlobContent, saveBlobContent } from '@/utils';

const FILE_NAME = 'meals.json';

export async function GET(request: Request, context: { params: { id: string } }) {

    const data = await getBlobContent<MealEntity>(FILE_NAME);

    console.log('All the meals?', data);

    const item = data.find(item => item.id === context.params.id);

    return Response.json(item);
}

// export async function PATCH(request: Request, context: { params: { id: string } }) {
//     const newItem = await request.json() as Meal;

//     const data = await getBlobContent<Meal>(FILE_NAME);

//     let existingItem = data.find(item => item.id === context.params.id);

//     if (!existingItem) {
//         return Response.json({ error: 'Item not found' }, { status: 404 });
//     }

//     existingItem.name = newItem.name;
//     existingItem.ingredients = newItem.ingredients;

//     await saveBlobContent<Meal>(FILE_NAME, data);

//     return Response.json(newItem);
// }