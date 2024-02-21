'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormData } from "./_components/Form";
import { db } from "../../../prisma/client";

export const getMeal = async (id: number) => {
    try {
        return await db.meal.findFirst({
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
    finally { await db.$disconnect(); }
}
export const getMeals = async () => {
    try {
        return await db.meal.findMany({
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
    finally { await db.$disconnect(); }
}

export const addMeal = async (meal: IFormData) => {
    try {
        await db.meal.create({
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
    finally { await db.$disconnect(); }

    revalidatePath('/meals');
    redirect('/meals');
}

export const updateMeal = async (meal: IFormData) => {
    try {
        if (!meal.id) throw new Error('No meal ID provided');

        const existingMeal = await getMeal(meal.id);

        if (!existingMeal) throw new Error('No meal found');

        existingMeal.name = meal.name;

        await db.meal.update({
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
    finally { await db.$disconnect(); }

    revalidatePath('/meals');
    redirect('/meals');
}

export const deleteMeal = async (formData: FormData) => {
    try {
        await db.meal.delete({
            where: {
                id: parseInt(formData.get('id')! as string)
            }
        });
    }
    catch (e) { console.error(e); }
    finally { await db.$disconnect(); }

    revalidatePath('/');
}