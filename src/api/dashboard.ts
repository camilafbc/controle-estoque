import api from "@/lib/axios";
import { DashboardOperacao, RelatorioDozeMeses } from "@/types/Operacao";

export const getDashTotalProdutos = async () => {
  const response = await api.get("/dashboard/totalGeral");
  return response.data;
};

export const getDashTotalTurmas = async () => {
  const response = await api.get("/dashboard/totalTurmas");
  return response.data;
};

export const getDashTotalVencimento = async () => {
  const response = await api.get("/dashboard/totalVencimento");
  return response.data;
};

export const getRelatorioDozeMeses = async (idCurso: number) => {
  const response = await api.get<RelatorioDozeMeses[]>(
    `/api/user/operacoes/relatorios/${idCurso}/last-12-months`,
  );
  return response.data;
};

export const getDashLastOperacoes = async (idCurso: number) => {
  const response = await api.get<DashboardOperacao[]>(
    `/api/user/operacoes/relatorios/${idCurso}/last-10-op`,
  );
  return response.data;
};

export const getDashTotalEstoque = async () => {
  const response = await api.get("/dashboard/totalEstoque");
  return response.data;
};

export const getCountUsers = async () => {
  const response = await api.get("/usersCount");
  return response.data;
};

export const getCountCursos = async () => {
  const response = await api.get("/cursosCount");
  return response.data;
};
