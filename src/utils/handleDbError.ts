export function handleDatabaseError(error: any): {
  status: number;
  message: string;
} {
  console.error("Erro capturado: ", error);

  // Tratamento de erros do Prisma
  if (error.code) {
    switch (error.code) {
      case "P2002":
        return {
          status: 400,
          message:
            "Já existe um registro com esse valor único (campo duplicado).",
        };

      case "P2003":
        return {
          status: 400,
          message:
            "Violação de chave estrangeira. O registro relacionado não existe.",
        };

      case "P2000":
        return {
          status: 400,
          message: "Valor de campo muito longo para o tipo definido.",
        };

      case "P2025":
        return {
          status: 404,
          message:
            "Registro não encontrado. Nenhuma linha foi afetada pela operação.",
        };

      case "P2011":
        return {
          status: 400,
          message: "Violação de constraint NOT NULL.",
        };

      default:
        break;
    }
  }

  // Tratamento de erros MySQL
  if (error.errno || error.sqlMessage || error.sqlState) {
    switch (error.code) {
      case "ER_DUP_ENTRY":
        return {
          status: 400,
          message: "Já existe um registro com esse valor!",
        };

      case "ER_NO_REFERENCED_ROW_2":
        return {
          status: 400,
          message: "O registro referenciado não existe!",
        };

      case "ER_BAD_NULL_ERROR":
        return {
          status: 400,
          message: "Campos obrigatórios não podem estar vazios!",
        };

      case "ER_ROW_IS_REFERENCED_2":
        return {
          status: 400,
          message:
            "Este registro está sendo referenciado por outro e não pode ser deletado.",
        };

      default:
        break;
    }
  }

  // Fallback
  return {
    status: 500,
    message: "Erro interno no servidor. Tente novamente mais tarde.",
  };
}
