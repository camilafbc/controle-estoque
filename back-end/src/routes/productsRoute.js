import { Router } from "express";
import { countProducts, deleteProduct, insertProduct, listProducts, selectProduct, updateProduct } from "../controllers/productControler.js";
import { ensureAuth } from "../middlewares/auth-middleware.js";

const productRouter = Router();

productRouter.get('/produtos/count', ensureAuth, countProducts);
productRouter.get('/produtos/list/:turma', ensureAuth, listProducts);
productRouter.get('/produtos/:id', ensureAuth, selectProduct);
productRouter.delete('/produtos/:id', ensureAuth, ensureAuth, deleteProduct);
productRouter.post('/produtos', ensureAuth, insertProduct);
productRouter.put('/produtos', ensureAuth, updateProduct);



export { productRouter }