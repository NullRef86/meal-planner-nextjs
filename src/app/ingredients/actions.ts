'use server'

import { revalidatePath } from "next/cache";
import { db } from "../../../prisma/client";
import { EMPTY_CATEGORY_VALUE } from "./_components/Form";

export const getIngredient = async (id: number) => {

    try {
        return await db.ingredient.findFirst({
            where: { id }
        });
    }
    catch (e) { console.error(e); }
    finally { await db.$disconnect(); }
}
export const getIngredients = async () => {
    try {
        return await db.ingredient.findMany();
    }
    catch (e) { console.error(e); return []; }
    finally { await db.$disconnect(); }
}

export const addIngredient = async (formData: FormData, preventRevalidation?: boolean) => {
    let units = formData.get('units')! as string | null;
    let category = formData.get('category')! as string | null;

    if (!units) units = null;
    if (category === EMPTY_CATEGORY_VALUE) category = null;

    try {
        await db.ingredient.create({
            data: {
                name: formData.get('name')! as string,
                units,
                category,
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await db.$disconnect(); }

    if (!preventRevalidation) {
        revalidatePath('/');
    }
}

export const updateIngredient = async (formData: FormData) => {
    let units = formData.get('units')! as string | null;
    let category: string | null = formData.get('category')! as string;

    if (!units) units = null;
    if (category === EMPTY_CATEGORY_VALUE) category = null;

    try {
        await db.ingredient.update({
            where: {
                id: parseInt(formData.get('id')! as string)
            },
            data: {
                name: formData.get('name')! as string,
                units,
                category,
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await db.$disconnect(); }

    revalidatePath('/');
}

export const deleteIngredient = async (formData: FormData) => {
    try {
        await db.ingredient.delete({
            where: {
                id: parseInt(formData.get('id')! as string)
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await db.$disconnect(); }

    revalidatePath('/');
}