/*
  Warnings:

  - Added the required column `category` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "category" VARCHAR(255) NOT NULL,
ADD COLUMN     "units" VARCHAR(255) NOT NULL;
