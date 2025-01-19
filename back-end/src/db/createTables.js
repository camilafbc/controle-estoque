import { createUserTable } from "../models/userModel.js";
import { createCursosTable } from "../models/cursosModel.js";
import { createTurmasTable } from "../models/turmasModel.js";
import { createProdutosTable } from "../models/productModel.js";
import { createOperacoesTable } from "../models/operacoesModel.js";

export async function createTables(){
  
  createCursosTable();
  createTurmasTable();
  createUserTable();
  createProdutosTable();
  createOperacoesTable();
};