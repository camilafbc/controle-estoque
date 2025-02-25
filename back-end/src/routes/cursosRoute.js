import { Router } from "express";
import { ensureAuth } from "../middlewares/auth-middleware.js";
import { countCursos, deleteCurso, getCursoById, insertCurso, listCursos, updateCurso } from "../controllers/cursosController.js";

const cursosRouter = Router();

cursosRouter.get('/cursos', ensureAuth, listCursos);
cursosRouter.get('/cursosCount', ensureAuth, countCursos);
cursosRouter.post('/cursos', ensureAuth, insertCurso);
cursosRouter.put('/cursos', ensureAuth, updateCurso);
cursosRouter.get('/cursos/:id', ensureAuth, getCursoById);
cursosRouter.delete('/cursos/:id', ensureAuth, deleteCurso);

export { cursosRouter }