import { Router } from "express";
import { ensureAuth } from "../middlewares/auth-middleware.js";
import { countUsers, deleteUser, getUserById, insertUser, listUsers, updateUser } from "../controllers/userController.js";


const usersRouter = Router();

usersRouter.get('/users', ensureAuth, listUsers);
usersRouter.get('/usersCount', ensureAuth, countUsers);
usersRouter.get('/users/:id', ensureAuth, getUserById);
usersRouter.post('/users', ensureAuth, insertUser);
usersRouter.put('/users', ensureAuth, updateUser);
usersRouter.delete('/users/:id', ensureAuth, deleteUser);

export { usersRouter }