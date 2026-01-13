import * as yup from "yup";

export const turmaValidationSchema = yup.object({
  codigoTurma: yup
    .string()
    .min(2, "Mínimo 2 caracteres")
    .required("Campo obrigatório"),
  turnoTurma: yup.string().required("Campo obrigatório"),
  status: yup.boolean().default(true).required(),
});

export const turmaUpdateValidationSchema = turmaValidationSchema.concat(
  yup.object({
    idTurma: yup.number().required("Campo obrigatório"),
  }),
);

export type FormTurmasFields = yup.InferType<typeof turmaValidationSchema>;
