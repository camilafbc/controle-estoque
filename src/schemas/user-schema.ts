import { z } from "zod";

// Schema para validação no formulário e update
export const userValidationSchema = z
  .object({
    nome: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    role: z.enum(["admin", "user"]),
    idCurso: z.string().nullable().optional(),
    status: z.boolean(),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .optional()
      .or(z.literal("")),
    confirmaSenha: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.role === "user" && !data.idCurso) {
      ctx.addIssue({
        code: "custom",
        path: ["idCurso"],
        message: "Campo obrigatório",
      });
    }
    if (data.password && data.password !== data.confirmaSenha) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmaSenha"],
        message: "As senhas não coincidem",
      });
    }
  });

export type FormUserFields = z.infer<typeof userValidationSchema>;

// Schema para atualizações parciais. O idUser identifica o registro e os
// demais campos são opcionais para permitir, por exemplo, alterar somente a
// senha.
export const userUpdateValidationSchema = z
  .object({
    idUser: z.number().int().positive("Usuário inválido"),
    nome: z.string().min(2, "Mínimo 2 caracteres").optional(),
    email: z.string().email("E-mail inválido").optional(),
    role: z.enum(["admin", "user"]).optional(),
    idCurso: z.number().int().positive("Curso inválido").nullable().optional(),
    status: z.boolean().optional(),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .optional(),
  })
  .refine(
    ({ idUser: _idUser, ...fields }) =>
      Object.values(fields).some((value) => value !== undefined),
    {
      message: "Informe ao menos um campo para atualizar.",
    },
  )
  .superRefine((data, ctx) => {
    if (data.role === "user" && data.idCurso == null) {
      ctx.addIssue({
        code: "custom",
        path: ["idCurso"],
        message: "Campo obrigatório",
      });
    }
  });

// Schema para validação na server action (criação de usuário)
export const userActionValidationSchema = z
  .object({
    nome: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    role: z.enum(["admin", "user"]),
    idCurso: z.number().nullable().optional(),
    status: z.boolean(),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .min(1, "Senha é obrigatória"),
  })
  .superRefine((data, ctx) => {
    if (data.role === "user" && data.idCurso == null) {
      ctx.addIssue({
        code: "custom",
        path: ["idCurso"],
        message: "Campo obrigatório",
      });
    }
  });
