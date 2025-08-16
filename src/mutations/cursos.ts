import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCurso, deleteCurso, updateCurso } from "@/api/cursos";
import { Curso } from "@/types/Curso";

export const useCreateCursoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (curso: Omit<Curso, "idCurso">) => createCurso(curso),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
  return mutation;
};

export const useUpdateCursoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (curso: Curso) => updateCurso(curso),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
      queryClient.invalidateQueries({
        queryKey: ["cursos", variables.idCurso],
      });
    },
  });
  return mutation;
};

export const useDeleteCursoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteCurso(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
  return mutation;
};
