import { useQuery } from "@tanstack/react-query";

import {
  getDashLastOperacoes,
  getDashTotalEstoque,
  getDashTotalProdutos,
  getDashTotalTurmas,
  getDashTotalVencimento,
  getRelatorioDozeMeses,
} from "@/api/dashboard";
import { DashboardOperacao, RelatorioDozeMeses } from "@/types/Operacao";

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

export const useDashRelatorioDozeMeses = (
  idCurso: number,
  initialData?: RelatorioDozeMeses[],
) => {
  const query = useQuery({
    queryKey: ["dashRelatorioDozeMeses"],
    queryFn: () => getRelatorioDozeMeses(idCurso),
    enabled: !!idCurso,
    initialData: initialData,
    staleTime: Infinity,
  });
  return query;
};

export const useDashLastOperacoes = (
  idCurso: number,
  initialData?: DashboardOperacao[],
) => {
  const query = useQuery({
    queryKey: ["dashLastOperacoes"],
    queryFn: () => getDashLastOperacoes(idCurso),
    enabled: !!idCurso,
    initialData: initialData,
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
