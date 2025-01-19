import { Router } from "express";
import { deleteTurma, getTurma, inserTurma, listTurmas, updateTurma } from "../controllers/turmasControler.js";
import { ensureAuth } from "../middlewares/auth-middleware.js";


const turmasRouter = Router();

turmasRouter.get('/turmas', ensureAuth, listTurmas);
turmasRouter.post('/turmas', ensureAuth, inserTurma);
turmasRouter.put('/turmas', ensureAuth, updateTurma);
turmasRouter.get('/turmas/:id', ensureAuth, getTurma);
turmasRouter.delete('/turmas/:id', ensureAuth, deleteTurma);

export { turmasRouter }