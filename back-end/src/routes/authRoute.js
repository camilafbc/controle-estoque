import { Router } from "express";
import { login } from "../controllers/authController.js";
import { insertUser, listUsers } from "../controllers/userController.js";

const authRouter = Router();

authRouter.post('/auth/login', login);
authRouter.get('/users', listUsers);
authRouter.post('/user', insertUser);


export { authRouter }