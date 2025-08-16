/*
  Warnings:

  - Made the column `uuid` on table `Produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uuid` on table `Turma` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Produto" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Turma" ALTER COLUMN "uuid" SET NOT NULL;
