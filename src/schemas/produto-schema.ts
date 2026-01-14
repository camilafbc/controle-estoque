import * as yup from "yup";

export const produtoValidationSchema = yup.object({
  prodDescricao: yup.string().required("Campo obrigatório"),
  prodFabricante: yup.string().required("Campo obrigatório"),
  prodLote: yup.string().required("Campo obrigatório"),
  prodQuantidade: yup
    .string()
    .matches(/^\d+$/, "Quantidade deve ser um número inteiro")
    .required("Campo obrigatório"),
  prodValidade: yup.date().required("Campo obrigatório"),

  turma: yup.string().required("Campo obrigatório"),
});

// export const produtoUpdateValidationSchema = produtoValidationSchema.concat(
//   yup.object({
//     idProduto: yup.number().required("Id obrigatório!"),
//   }),
// );

export type FormProdutoFields = yup.InferType<typeof produtoValidationSchema>;
