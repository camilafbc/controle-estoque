import { Router } from "express";

import { last10Operacoes, relatorioAnualOperacoes, totalEstoque, totalProdutosGeral, totalTurmas, totalVencimento } from "../controllers/dashboardController.js";
import { ensureAuth } from "../middlewares/auth-middleware.js";

const dashboardRouter = Router();

dashboardRouter.get('/dashboard/totalGeral', ensureAuth, totalProdutosGeral);
dashboardRouter.get('/dashboard/totalTurmas', ensureAuth, totalTurmas);
dashboardRouter.get('/dashboard/totalVencimento', ensureAuth, totalVencimento);
dashboardRouter.get('/dashboard/relatorioDozeMeses', ensureAuth, relatorioAnualOperacoes);
dashboardRouter.get('/dashboard/lastDezOperacoes', ensureAuth, last10Operacoes);
dashboardRouter.get('/dashboard/totalEstoque', ensureAuth, totalEstoque);

export { dashboardRouter }