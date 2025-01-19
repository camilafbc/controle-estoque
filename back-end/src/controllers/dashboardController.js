import { operacoesModel } from "../models/operacoesModel.js";
import { productModel } from "../models/productModel.js";
import { turmasModel } from "../models/turmasModel.js";

export async function totalProdutosGeral(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.countProducts(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}

export async function totalTurmas(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await turmasModel.getCountTurmas(idCurso)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}

export async function totalVencimento(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.getExpiringProducts(idCurso)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}

export async function relatorioAnualOperacoes(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await operacoesModel.relatorioUltimosDozeMeses(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}

export async function last10Operacoes(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await operacoesModel.listLastTen(idCurso)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}

export async function totalEstoque(req, res) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.totalEstoque(idCurso)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: "Erro ao buscar dados"});
  }
}