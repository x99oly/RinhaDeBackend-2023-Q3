-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "termo" TEXT;

-- CreateIndex
CREATE INDEX "Pessoa_id_idx" ON "Pessoa"("id");
