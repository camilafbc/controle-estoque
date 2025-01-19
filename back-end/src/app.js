import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
// import { createTables } from './db/dbConfig.js';
import { createTables } from './db/createTables.js';
import { productRouter } from './routes/productsRoute.js';
import { authRouter } from './routes/authRoute.js';
import { turmasRouter } from './routes/turmasRoute.js';
import { operacoesRouter } from './routes/operacoesRoute.js';
import { dashboardRouter } from './routes/dashboardRoute.js';
import { cursosRouter } from './routes/cursosRoute.js';
import { usersRouter } from './routes/usersRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(usersRouter);
app.use(cursosRouter);
app.use(productRouter);
app.use(operacoesRouter);
app.use(turmasRouter);
app.use(dashboardRouter);

const PORT = process.env.PORT

try {
  createTables().then(
    app.listen(PORT, () => console.log(`Servidor disponível em http://localhost:${PORT}`))
  )
} catch(error){
  console.log("Erro ao criar banco de dados!")
}

