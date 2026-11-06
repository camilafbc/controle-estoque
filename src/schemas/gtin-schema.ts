import { z } from "zod";

export function isValidGtin(value: string): boolean {
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(value)) return false;

  const digits = value.split("").map(Number);
  const checkDigit = digits.pop();
  if (checkDigit === undefined) return false;

  const sum = digits.reduce(
    (total, digit, index) =>
      total + digit * ((digits.length - index) % 2 === 1 ? 3 : 1),
    0,
  );
  return (10 - (sum % 10)) % 10 === checkDigit;
}

export const gtinSchema = z
  .string()
  .refine(isValidGtin, "Código de barras inválido ou com dígito verificador incorreto");

export const gtinProductResponseSchema = z.object({
  ean: z.string(),
  nome: z.string().optional(),
  nome_acento: z.string().optional(),
  marca: z.string().optional(),
});

export type GtinProductResponse = z.infer<typeof gtinProductResponseSchema>;
