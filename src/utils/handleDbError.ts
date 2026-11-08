type DatabaseError = {
  code?: string;
  errno?: string | number;
  sqlMessage?: string;
  sqlState?: string;
};

export function handleDatabaseError(error: unknown): {
  status: number;
  message: string;
} {
  // Tratamento de erros do Prisma
  const dbError = isDatabaseError(error) ? error : {};

  if (dbError.code) {
    switch (dbError.code) {
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
            "Este registro não pode ser excluído ou alterado pois existem outros dados vinculados a ele.",
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
  if (dbError.errno || dbError.sqlMessage || dbError.sqlState) {
    switch (dbError.code) {
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

function isDatabaseError(error: unknown): error is DatabaseError {
  return typeof error === "object" && error !== null;
}
