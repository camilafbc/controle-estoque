import {
  getDashLastOperacoes,
  getDashTotalEstoque,
  getDashTotalProdutos,
  getDashTotalTurmas,
  getDashTotalVencimento,
  getRelatorioDozeMeses,
} from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashTotal = () => {
  const query = useQuery({
    queryKey: ["dashTotalProdutos"],
    queryFn: () => getDashTotalProdutos(),
    staleTime: Infinity,
  });
  return query;
};

export const useDashTotalTurmas = () => {
  const query = useQuery({
    queryKey: ["dashTotalTurmas"],
    queryFn: () => getDashTotalTurmas(),
    staleTime: Infinity,
  });
  return query;
};

export const useDashTotalVencimento = () => {
  const query = useQuery({
    queryKey: ["dashTotalVencimento"],
    queryFn: () => getDashTotalVencimento(),
    staleTime: Infinity,
  });
  return query;
};

export const useDashRelatorioDozeMeses = () => {
  const query = useQuery({
    queryKey: ["dashRelatorioDozeMeses"],
    queryFn: () => getRelatorioDozeMeses(),
    staleTime: Infinity,
  });
  return query;
};

export const useDashLastOperacoes = () => {
  const query = useQuery({
    queryKey: ["dashLastOperacoes"],
    queryFn: () => getDashLastOperacoes(),
  });
  return query;
};

export const useDashTotalEstoque = () => {
  const query = useQuery({
    queryKey: ["dashTotalEstoque"],
    queryFn: () => getDashTotalEstoque(),
  });
  return query;
};
