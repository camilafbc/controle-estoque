// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   createOperacao,
//   deleteProdutos,
//   deleteTurma,
//   insertProduto,
//   insertTurma,
//   updateProduto,
//   updateTurma,
// } from "./api";
// import { toast } from "react-toastify";
// import { Produto } from "@/types/Produto";

// export const useDeleteProductMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (id: number) => deleteProdutos(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["produtos"] });
//     },
//   });
//   return mutation;
// };

// export const useInsertProductMutation = (turma: number) => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (produto: Omit<Produto, "idProduto">) => insertProduto(produto),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["produtos", turma] });
//     },
//   });
//   return mutation;
// };

// export const useUpdateProductMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (produto: Produto) => updateProduto(produto),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["produtos"] });
//     },
//   });
//   return mutation;
// };

// Turmas

// export const useInsertTurmaMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (turma: any) => insertTurma(turma),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["turmas"] });
//     },
//   });
//   return mutation;
// };

// export const useUpdateTurmaMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (turma: any) => updateTurma(turma),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["turmas"] });
//     },
//   });
//   return mutation;
// };

// export const useDeleteTurmaMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (id: number) => deleteTurma(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["turmas"] });
//     },
//   });
//   return mutation;
// };

// Operações
// export const useCreateOperacaoMutation = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (operacao: {
//       idProduto: number;
//       tipoOp: number;
//       quantidade: number;
//     }) => createOperacao(operacao),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["operacoes"] });
//     },
//   });
//   return mutation;
// };
