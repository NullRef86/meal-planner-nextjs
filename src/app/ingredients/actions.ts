'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getIngredient = async (id: number) => {
    const prisma = new PrismaClient();
    try {
        return await prisma.ingredient.findFirst({
            where: { id }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }
}
export const getIngredients = async () => {
    const prisma = new PrismaClient();
    try {
        return await prisma.ingredient.findMany();
    }
    catch (e) { console.error(e); return []; }
    finally { await prisma.$disconnect(); }
}

export const addIngredient = async (formData: FormData) => {
    const prisma = new PrismaClient();
    try {
        await prisma.ingredient.create({
            data: {
                name: formData.get('name')! as string,
                units: formData.get('units')! as string,
                category: formData.get('category')! as string,
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }

    revalidatePath('/');
    redirect('/ingredients');
}

export const updateIngredient = async (formData: FormData) => {
    const prisma = new PrismaClient();
    try {
        await prisma.ingredient.update({
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
    finally { await prisma.$disconnect(); }

    revalidatePath('/');
    redirect('/ingredients');
}

export const deleteIngredient = async (formData: FormData) => {
    const prisma = new PrismaClient();
    try {
        await prisma.ingredient.delete({
            where: {
                id: parseInt(formData.get('id')! as string)
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }

    revalidatePath('/');
}