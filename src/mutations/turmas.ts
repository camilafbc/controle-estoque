import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTurma } from "@/actions/turmas/create-turma";
import { deleteTurma } from "@/actions/turmas/delete-turma";
import { updateTurma } from "@/actions/turmas/update-turma";
import { Turma } from "@/types/Turma";

export const useCreateTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (turma: Omit<Turma, "idTurma">) => createTurma(turma),
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
    mutationFn: (turma: Turma) => updateTurma(turma),
    onSuccess: () => {
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
