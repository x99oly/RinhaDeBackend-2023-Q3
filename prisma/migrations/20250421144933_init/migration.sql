/*
  Warnings:

  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pessoa_id_seq";
