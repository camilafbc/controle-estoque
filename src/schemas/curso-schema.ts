import * as yup from "yup";

export const cursoValidationSchema = yup.object({
  nomeCurso: yup
    .string()
    .min(3, "Mínimo 3 caracteres")
    .required("Campo obrigatório"),
  status: yup.boolean().required("Campo obrigatório"),
});

export const cursoUpdateSchema = cursoValidationSchema.concat(
  yup.object({
    idCurso: yup.number().required("ID é necessário para atualizar"),
  }),
);
