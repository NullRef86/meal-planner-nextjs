import { Ingredient } from '@/models';
import { getBlobContent, saveBlobContent } from '@/utils';
import { sql } from '@vercel/postgres';

const FILE_NAME = 'ingredients.json';

export async function GET(request: Request, context: { params: { id: string } }) {

    const { rows } = await sql`SELECT * FROM ingredients WHERE id = ${context.params.id} LIMIT 1`;

    if (rows.length === 0) {
        return Response.json({ error: 'Item not found' }, { status: 404 });
    }

    return Response.json(rows[0]);
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
    const newItem = await request.json() as Ingredient;

    await sql`
        UPDATE ingredients 
        SET name = ${newItem.name},
               units = ${newItem.units},
               category = ${newItem.category} 
        WHERE id = ${context.params.id}
    `;

    return new Response(null, { status: 204 });
}