/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Turma` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Turma" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Turma_uuid_key" ON "Turma"("uuid");
