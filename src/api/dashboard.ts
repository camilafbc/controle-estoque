import api from "@/lib/axios";

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

export const getRelatorioDozeMeses = async () => {
  const response = await api.get("/dashboard/relatorioDozeMeses");
  return response.data;
};

export const getDashLastOperacoes = async () => {
  const response = await api.get("/dashboard/lastDezOperacoes");
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
