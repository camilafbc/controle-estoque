import { z } from "zod";

export const userProfileValidationSchema = z
  .object({
    nome: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .optional()
      .or(z.literal("")),
    confirmaSenha: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.password !== data.confirmaSenha) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmaSenha"],
        message: "As senhas não coincidem",
      });
    }
  });

export type FormUserProfileFields = z.infer<
  typeof userProfileValidationSchema
>;
