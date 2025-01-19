// import {
//   createRelatorioMovimentacoes,
//   getDashLastOperacoes,
//   getDashTotalEstoque,
//   getDashTotalProdutos,
//   getDashTotalTurmas,
//   getDashTotalVencimento,
//   getOperacoes,
//   getProduto,
//   getProdutos,
//   getRelatorioDozeMeses,
//   getTurmaById,
//   getTurmas,
// } from "@/lib/api";
// import { Produto } from "@/types/Produto";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// export const useProdutos = (turma: number) => {
//   const query = useQuery({
//     queryKey: ["produtos", turma],
//     queryFn: () => getProdutos(turma),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useProduto = (id: number) => {
//   const query = useQuery({
//     queryKey: ["produto", id],
//     queryFn: () => getProduto(id),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useGetProdutoById = (idProduto: number) => {
//   const queryClient = useQueryClient();

//   return useQuery(['produto', idProduto], async () => {
//     // Verificar no cache
//     const cachedProdutos = queryClient.getQueryData(["produtos"]);
//     console.log("Cached: ", cachedProdutos);

//     // Filtrar o produto específico
//     const produto = Array.isArray(cachedProdutos)
//       ? cachedProdutos.find((produto: Produto) => produto.idProduto === idProduto)
//       : undefined;

//     if (produto) {
//       return produto;
//     } else {
//       // Buscar do servidor se não estiver no cache
//       const response = await fetch(`/api/produtos/${idProduto}`);
//       if (!response.ok) {
//         throw new Error("Erro ao buscar produto");
//       }
//       return response.json();
//     }
//   }, {
//     enabled: !!idProduto, // Executar apenas se idProduto for válido
//   });
// };

// TURMAS
// export const useTurmas = () => {
//   // console.log("Chamou o useTurmas");
//   const query = useQuery({
//     queryKey: ["turmas"],
//     queryFn: () => getTurmas(),
//     staleTime: Infinity,
//   });
//   // console.log("Resultado da Query: " + query);
//   return query;
// };

// export const useGetTurma = (id: string) => {
//   const query = useQuery({
//     queryKey: ["turmas", id],
//     queryFn: () => getTurmaById(id),
//     enabled: !!id,
//     staleTime: Infinity,
//   });
//   return query;
// };

// Operacoes

// export const useOperacoes = (id: number) => {
//   const query = useQuery({
//     queryKey: ["operacoes"],
//     queryFn: () => getOperacoes(id),
//     enabled: !!id,
//     staleTime: Infinity,
//   });
//   return query;
// };

// DASHBOARD

// export const useDashTotal = () => {
//   const query = useQuery({
//     queryKey: ["dashTotalProdutos"],
//     queryFn: () => getDashTotalProdutos(),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useDashTotalTurmas = () => {
//   const query = useQuery({
//     queryKey: ["dashTotalTurmas"],
//     queryFn: () => getDashTotalTurmas(),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useDashTotalVencimento = () => {
//   const query = useQuery({
//     queryKey: ["dashTotalVencimento"],
//     queryFn: () => getDashTotalVencimento(),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useDashRelatorioDozeMeses = () => {
//   const query = useQuery({
//     queryKey: ["dashRelatorioDozeMeses"],
//     queryFn: () => getRelatorioDozeMeses(),
//     staleTime: Infinity,
//   });
//   return query;
// };

// export const useDashLastOperacoes = () => {
//   const query = useQuery({
//     queryKey: ["dashLastOperacoes"],
//     queryFn: () => getDashLastOperacoes(),
//   });
//   return query;
// };

// export const useDashTotalEstoque = () => {
//   const query = useQuery({
//     queryKey: ["dashTotalEstoque"],
//     queryFn: () => getDashTotalEstoque(),
//   });
//   return query;
// };
