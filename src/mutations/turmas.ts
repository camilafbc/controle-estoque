import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTurma } from "@/actions/turmas/create-turma";
import { deleteTurma } from "@/actions/turmas/delete-turma";
import { updateTurma } from "@/actions/turmas/update-turma";

export const useCreateTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (turma: any) => createTurma(turma),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["turmas", data.data?.idCurso],
      });
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
