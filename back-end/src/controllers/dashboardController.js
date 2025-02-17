import { operacoesModel } from "../models/operacoesModel.js";
import { productModel } from "../models/productModel.js";
import { turmasModel } from "../models/turmasModel.js";

export async function totalProdutosGeral(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.countProducts(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function totalTurmas(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await turmasModel.getCountTurmas(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function totalVencimento(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.getExpiringProducts(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function relatorioAnualOperacoes(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await operacoesModel.relatorioUltimosDozeMeses(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function last10Operacoes(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await operacoesModel.listLastTen(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function totalEstoque(req, res, next) {
  const idCurso = req.user.idCurso;

  try {
    const result = await productModel.totalEstoque(idCurso);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};