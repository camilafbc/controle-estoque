import { Produto } from "@/types/Produto";
import api from "./axios";

// PRODUTOS

// export const getProdutos = async (turma: number): Promise<Produto[]> => {
//   const response = await api.get(`/produtos/list/${turma}`);
//   return response.data;
// };

// export const getProduto = async (id: number): Promise<Produto> => {
//   const response = await api.get(`/produtos/${id}`);
//   return response.data;
// };

// export const insertProduto = async (product: Omit<Produto, "idProduto">) => {
//   const response = await api.post("/produtos", { product });
//   return response.data;
// };

// export const updateProduto = async (product: Produto) => {
//   const response = await api.put("/produtos", { product });
//   return response;
// };

// export const deleteProdutos = async (id: number) => {
//   const response = await api.delete(`/produtos/${id}`);
//   return response.status;
// };

// TURMAS

// export const getTurmas = async () => {
//   const response = await api.get(`/turmas`);
//   return response.data;
// };

// export const getTurmaById = async (id: string) => {
//   const response = await api.get(`/turmas/${id}`);
//   return response.data;
// };

// export const insertTurma = async (turma: any) => {
//   const response = await api.post("/turmas", turma);
//   return response.status;
// };

// export const updateTurma = async (turma: any) => {
//   const response = await api.put("/turmas", turma);
//   return response.status;
// };

// export const deleteTurma = async (id: number) => {
//   const response = await api.delete(`/turmas/${id}`);
//   return response.status;
// };

// Operações

// export const getOperacoes = async (id: number) => {
//   const response = await api.get(`/movimentacoes/${id}`);
//   console.log("Chamou a API: " + response.data);
//   return response.data;
// };

// export const createOperacao = async (operacao: {
//   idProduto: number;
//   tipoOp: number;
//   quantidade: number;
// }) => {
//   const result = await api.post("/movimentacoes/add", operacao);
//   console.log("Operação: ", result);
//   return result;
// };

// Relatório
// export const createRelatorioMovimentacoes = async (formatedData: {
//   idTurma: string;
//   dataInicial: string;
//   dataFinal: string;
// }) => {
//   const response = await api.post(
//     "/movimentacoes/relatorioMovTurma",
//     formatedData,
//   );
//   // const response = await api.get(`/movimentacoes/${id}`);
//   // console.log("Chamou a API: " + response.data);
//   return response.data;
// };

// DASHBOARD

// export const getDashTotalProdutos = async () => {
//   const response = await api.get("/dashboard/totalGeral");
//   return response.data;
// };

// export const getDashTotalTurmas = async () => {
//   const response = await api.get("/dashboard/totalTurmas");
//   return response.data;
// };

// export const getDashTotalVencimento = async () => {
//   const response = await api.get("/dashboard/totalVencimento");
//   return response.data;
// };

// export const getRelatorioDozeMeses = async () => {
//   const response = await api.get("/dashboard/relatorioDozeMeses");
//   return response.data;
// };

// export const getDashLastOperacoes = async () => {
//   const response = await api.get("/dashboard/lastDezOperacoes");
//   return response.data;
// };

// export const getDashTotalEstoque = async () => {
//   const response = await api.get("/dashboard/totalEstoque");
//   return response.data;
// };
