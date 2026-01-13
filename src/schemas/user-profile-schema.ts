import * as yup from "yup";

export const userProfileValidationSchema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
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
