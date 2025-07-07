-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Curso" (
    "idCurso" SERIAL NOT NULL,
    "nomeCurso" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("idCurso")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "idCurso" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Turma" (
    "idTurma" SERIAL NOT NULL,
    "codigoTurma" VARCHAR(50) NOT NULL,
    "turnoTurma" VARCHAR(50) NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("idTurma")
);

-- CreateTable
CREATE TABLE "Produto" (
    "idProduto" SERIAL NOT NULL,
    "prodDescricao" VARCHAR(255) NOT NULL,
    "prodFabricante" VARCHAR(255) NOT NULL,
    "prodQuantidade" INTEGER NOT NULL,
    "prodValidade" TIMESTAMP(3) NOT NULL,
    "prodLote" VARCHAR(255) NOT NULL,
    "prodCurso" INTEGER NOT NULL,
    "prodTurma" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("idProduto")
);

-- CreateTable
CREATE TABLE "Operacao" (
    "idOperacao" SERIAL NOT NULL,
    "tipoOperacao" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Operacao_pkey" PRIMARY KEY ("idOperacao")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nomeCurso_key" ON "Curso"("nomeCurso");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Turma_codigoTurma_key" ON "Turma"("codigoTurma");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_prodDescricao_key" ON "Produto"("prodDescricao");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("idCurso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("idCurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_prodCurso_fkey" FOREIGN KEY ("prodCurso") REFERENCES "Curso"("idCurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_prodTurma_fkey" FOREIGN KEY ("prodTurma") REFERENCES "Turma"("idTurma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operacao" ADD CONSTRAINT "Operacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operacao" ADD CONSTRAINT "Operacao_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto"("idProduto") ON DELETE CASCADE ON UPDATE CASCADE;
