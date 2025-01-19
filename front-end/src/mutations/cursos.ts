import { deleteCurso, insertCurso, updateCurso } from "@/api/cursos";
import { Curso } from "@/types/Curso";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertCursoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (curso: Omit<Curso, "idCurso">) => insertCurso(curso),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
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
