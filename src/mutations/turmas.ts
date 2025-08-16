import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTurma, deleteTurma, updateTurma } from "@/api/turmas";

export const useInsertTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (turma: any) => createTurma(turma),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
  return mutation;
};

export const useUpdateTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (turma: any) => updateTurma(turma),
    onSuccess: (_, variables, ctx) => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
  return mutation;
};

export const useDeleteTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteTurma(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
  return mutation;
};
