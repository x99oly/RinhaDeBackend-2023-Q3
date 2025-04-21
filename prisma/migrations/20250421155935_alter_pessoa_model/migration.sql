/*
  Warnings:

  - You are about to alter the column `apelido` on the `Pessoa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `nome` on the `Pessoa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `stack` on the `Pessoa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - A unique constraint covering the columns `[apelido]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pessoa" ALTER COLUMN "apelido" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "stack" SET DATA TYPE VARCHAR(32)[];

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_apelido_key" ON "Pessoa"("apelido");
