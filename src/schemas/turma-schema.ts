import { z } from "zod";

export const turmaValidationSchema = z.object({
  codigoTurma: z.string().min(2, "Mínimo 2 caracteres"),
  turnoTurma: z.string().min(1, "Campo obrigatório"),
  status: z.boolean().default(true),
});

export const turmaUpdateValidationSchema = z.object({
  ...turmaValidationSchema.shape,
  idTurma: z.number({ message: "Campo obrigatório" }),
});

export type FormTurmasFields = z.infer<typeof turmaValidationSchema>;
