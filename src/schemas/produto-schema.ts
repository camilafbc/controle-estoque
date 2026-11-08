import { z } from "zod";

export const produtoValidationSchema = z.object({
  prodCodigoBarras: z
    .string()
    .regex(/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/, "Código de barras inválido")
    .optional()
    .or(z.literal("")),
  prodDescricao: z.string().min(1, "Campo obrigatório"),
  prodFabricante: z.string().min(1, "Campo obrigatório"),
  prodQuantidade: z
    .string()
    .regex(/^\d+$/, "Quantidade deve ser um número inteiro"),
  prodValidade: z.coerce.date({ message: "Campo obrigatório" }),
  turma: z.string().min(1, "Campo obrigatório"),
});

export type FormProdutoFields = z.infer<typeof produtoValidationSchema>;
