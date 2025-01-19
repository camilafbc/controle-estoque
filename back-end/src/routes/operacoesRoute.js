import { Router } from "express";

import { ensureAuth } from "../middlewares/auth-middleware.js";
import { createOperacao, createRelatorioMovimentacoesTurma, getOperacoes } from "../controllers/operacoesControler.js";

const operacoesRouter = Router();

operacoesRouter.get('/movimentacoes/:id', ensureAuth, getOperacoes);
operacoesRouter.post('/movimentacoes/add', ensureAuth, createOperacao);
operacoesRouter.post('/movimentacoes/relatorioMovTurma', ensureAuth, createRelatorioMovimentacoesTurma);
// productRouter.get('/produtos/:id', ensureAuth, selectProduct);
// productRouter.delete('/produtos/:id', ensureAuth, ensureAuth, deleteProduct);
// productRouter.post('/produtos', ensureAuth, insertProduct);
// productRouter.put('/produtos', ensureAuth, updateProduct);



export { operacoesRouter };