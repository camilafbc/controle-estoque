-- CreateIndex
CREATE INDEX "User_idCurso_idx" ON "User"("idCurso");

-- CreateIndex
CREATE INDEX "Turma_idCurso_idx" ON "Turma"("idCurso");

-- CreateIndex
CREATE INDEX "Produto_prodCurso_prodTurma_idx" ON "Produto"("prodCurso", "prodTurma");

-- CreateIndex
CREATE INDEX "Operacao_idProduto_data_idx" ON "Operacao"("idProduto", "data");
