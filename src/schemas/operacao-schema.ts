import { z } from "zod";

export const operacaoValidationSchema = z.object({
  uuidProduto: z.string().min(1, "Parâmetro obrigatório"),
  tipoOp: z
    .number()
    .int("Tipo de operação inválido.")
    .refine((value) => value === 0 || value === 1, "Tipo de operação inválido."),
  qtd: z
    .number()
    .int("A quantidade deve ser um número inteiro.")
    .min(1, "Quantidade mínima para movimentação é 1."),
});
