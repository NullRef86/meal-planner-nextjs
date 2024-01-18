//export const dynamic = 'force-dynamic' // defaults to auto

import { Ingredient } from '@/models';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// export async function GET(request: Request) {
//     const file = await fs.readFile(process.cwd() + '/data/ingredients.json', 'utf8');

//     const data = JSON.parse(file) as Ingredient[];

//     return Response.json([data.reverse());
// }

export async function POST(request: Request, response: Response) {
    //console.log('ingredient', request.json());
    const newIngredient = await request.json() as Ingredient;
    console.log('ingredient', newIngredient);
    const file = await fs.readFile(process.cwd() + '/data/ingredients.json', 'utf8');
    const ingredients = JSON.parse(file) as Ingredient[];

    newIngredient.id = uuidv4();

    ingredients.push(newIngredient);

    await fs.writeFile(
        process.cwd() + '/data/ingredients.json',
        JSON.stringify(ingredients, null, 4)
    );

    return Response.json(newIngredient);


}
