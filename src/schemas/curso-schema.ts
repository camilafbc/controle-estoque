import { z } from "zod";

export const cursoValidationSchema = z.object({
  nomeCurso: z.string().min(3, "Mínimo 3 caracteres"),
  status: z.boolean(),
});

export const cursoUpdateSchema = z.object({
  ...cursoValidationSchema.shape,
  idCurso: z.number({ message: "ID é necessário para atualizar" }),
});

export type FormCursoFields = z.infer<typeof cursoValidationSchema>;
