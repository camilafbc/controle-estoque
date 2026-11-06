ALTER TABLE "Produto" ADD COLUMN "prodCodigoBarras" VARCHAR(14);

CREATE UNIQUE INDEX "Produto_prodCodigoBarras_key" ON "Produto"("prodCodigoBarras");

ALTER TABLE "Produto" DROP COLUMN "prodLote";
