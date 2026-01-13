import * as yup from "yup";

// Schema para validação no formulário e update
export const userValidationSchema = yup.object({
  nome: yup
    .string()
    .min(2, "Mínimo 2 caracteres")
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  role: yup.string().required("Campo obrigatório"),
  idCurso: yup
    .string()
    .nullable()
    .when("role", {
      is: "user",
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.notRequired(),
    }),
  status: yup.boolean().required("Campo obrigatório"),
  password: yup
    .string()
    .test("senha-required", "Campo obrigatório", function (value) {
      const isRequired = !this.options?.context?.isEdit;
      if (isRequired && !value) {
        return this.createError({ message: "Senha é obrigatória" });
      }
      return true;
    })
    .test(
      "min-length",
      "A senha deve ter no mínimo 6 caracteres",
      (value) => !value || value.length >= 6,
    ),
  confirmaSenha: yup
    .string()
    .test("confirmaSenha", "As senhas não coincidem", function (value) {
      const { password } = this.parent;
      return !password || password === value;
    }),
});

export type FormUserFields = yup.InferType<typeof userValidationSchema>;

// Schema para validação na server action (criação de usuário)
export const userActionValidationSchema = yup.object({
  nome: yup
    .string()
    .min(2, "Mínimo 2 caracteres")
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  role: yup.string().oneOf(["admin", "user"]).required("Campo obrigatório"),
  idCurso: yup
    .number()
    .nullable()
    .when("role", {
      is: "user",
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
  status: yup.boolean().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});
