import { openDb } from "../db/dbConfig.js";
import { operacoesModel } from "../models/operacoesModel.js";
import { productModel } from "../models/productModel.js";
import { turmasModel } from "../models/turmasModel.js";

export async function createOperacao(req, res) {
  const idUser = req.user.idUser;
  const { idProduto, tipoOp, quantidade } = req.body

  try {
    await operacoesModel.createOperacao(idUser, idProduto, tipoOp, quantidade);
    const produto = await productModel.getProductById(idProduto);
    const currentQtd = await Number(produto.prodQuantidade);
    let newQtd = 0;
    if(tipoOp === 1){
      newQtd = currentQtd + quantidade
    };

    if(tipoOp === 0 && currentQtd >= quantidade){
      newQtd = currentQtd - quantidade
    }

    const updateQuantidade = await productModel.updateProductQuantity(idProduto, newQtd);
    if (updateQuantidade > 0){
      return res.status(201).json({message: "Registro atualizado com sucesso!"});
    } else {
      return res.status(400).json({message: "Erro ao atualizar registro!"});
    }
  } catch (error) {
    return res.status(400).json({message: `Erro ao atualizar registro!`});
  }
};

export async function createOperacaoAtAdd(req, res) {
  const idUser = req.user.idUser;
  const { idProduto, tipoOp, quantidade } = req.body

  try {
    const operacao = await operacoesModel.createOperacao(idUser, idProduto, tipoOp, quantidade)
    return res.status(201).json(operacao, {message: "Dados criados com sucesso!"});

  } catch (error) {
    return res.status(400).json({message: `Erro ao criar operação: ${error.message}`});
  }
};

// GET /movimentacoes/:id
export async function getOperacoes(req, res) {

  const { id }= req.params
  console.log("Get Operações: " + id)

  try {
    const result = await operacoesModel.listAll(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: `Erro no catch: ${error.message}`});
  }
}

// Relatório 
export async function createRelatorioMovimentacoesTurma(req, res){
  const idCurso = req.user.idCurso;
  const nomeUser = req.user.nome;
  const { idTurma, dataInicial, dataFinal } = req.body;
  console.log("Chegou no body idTurma: " + idTurma)
  console.log("Chegou no body data1: " + dataInicial)
  console.log("Chegou no body data2: " + dataFinal)

  if(!idTurma || !dataInicial || !dataFinal ) return res.status(400).json({message: 'Todos os dados são obrigatórios!'});

  try {
    const result = await operacoesModel.relatorioOperacoes(idCurso, idTurma, dataInicial, dataFinal);
    const turma = await turmasModel.getTurmasByID(idTurma);
    const codTurma = turma.codigoTurma;
    const turnoTurma = turma.turnoTurma;
    const saida = {result, nomeUser, dataInicial, dataFinal, codTurma, turnoTurma}
    return res.status(200).json(saida);
  } catch (error) {
    return res.status(400).json({message: `Erro no catch: ${error.message}`});
  }

}