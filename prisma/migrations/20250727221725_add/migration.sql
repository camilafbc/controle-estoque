/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Produto_uuid_key" ON "Produto"("uuid");
