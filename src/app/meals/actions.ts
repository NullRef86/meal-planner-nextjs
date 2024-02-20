'use server'

import { Meal, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormData } from "./_components/Form";

export const getMeal = async (id: number) => {
    const prisma = new PrismaClient();
    try {
        return await prisma.meal.findFirst({
            where: { id },
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }
}
export const getMeals = async () => {
    const prisma = new PrismaClient();
    try {
        return await prisma.meal.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });
    }
    catch (e) { console.error(e); return []; }
    finally { await prisma.$disconnect(); }
}

export const addMeal = async (meal: IFormData) => {
    const prisma = new PrismaClient();
    try {
        await prisma.meal.create({
            data: {
                name: meal.name,
                ingredients: {
                    create: meal.ingredients.map(ingredient => ({
                        amount: ingredient.amount,
                        ingredient: {
                            connect: {
                                id: ingredient.ingredient.id
                            }
                        }
                    }))
                }
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }

    revalidatePath('/meals');
    redirect('/meals');
}

export const updateMeal = async (meal: IFormData) => {
    const prisma = new PrismaClient();
    try {
        if (!meal.id) throw new Error('No meal ID provided');

        const existingMeal = await getMeal(meal.id);

        if (!existingMeal) throw new Error('No meal found');

        existingMeal.name = meal.name;

        await prisma.meal.update({
            where: {
                id: meal.id
            },
            data: {
                name: meal.name,
                ingredients: {
                    deleteMany: existingMeal.ingredients.map(i => ({ id: i.id })),
                    create: meal.ingredients.map(ingredient => ({
                        amount: ingredient.amount,
                        ingredient: {
                            connect: {
                                id: ingredient.ingredient.id
                            }
                        }
                    }))
                }
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }

    revalidatePath('/meals');
    redirect('/meals');
}

export const deleteMeal = async (formData: FormData) => {
    const prisma = new PrismaClient();
    try {
        await prisma.meal.delete({
            where: {
                id: parseInt(formData.get('id')! as string)
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }

    revalidatePath('/');
}