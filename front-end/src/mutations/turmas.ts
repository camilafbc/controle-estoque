import { deleteTurma, insertTurma, updateTurma } from "@/api/turmas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertTurmaMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (turma: any) => insertTurma(turma),
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
