'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../../../prisma/client";


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
    try {
        await db.ingredient.create({
            data: {
                name: formData.get('name')! as string,
                units: formData.get('units')! as string,
                category: formData.get('category')! as string,
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
    try {
        await db.ingredient.update({
            where: {
                id: parseInt(formData.get('id')! as string)
            },
            data: {
                name: formData.get('name')! as string,
                units: formData.get('units')! as string,
                category: formData.get('category')! as string,
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