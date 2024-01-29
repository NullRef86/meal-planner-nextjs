import { Ingredient } from '@/models';
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    const { rows } = await sql`SELECT * FROM ingredients`;

    return Response.json(rows);
}

export async function POST(request: Request, response: Response) {
    const newIngredient = await request.json() as Ingredient;

    await sql`
        INSERT INTO ingredients (name, units, category) 
        VALUES (${newIngredient.name}, ${newIngredient.units}, ${newIngredient.category})
    `;

    return new Response(null, { status: 204 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    await sql`DELETE FROM ingredients WHERE id = ${id}`;

    return new Response(null, { status: 204 });
}
