-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "apelido" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);
