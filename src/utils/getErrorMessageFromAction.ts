type ActionError = {
  error?: string;
  message?: string | string[];
};

export const getErrorMessageFromAction = (data: ActionError): string => {
  const message = Array.isArray(data.message)
    ? data.message.join(", ")
    : data.message;
  return message ?? data.error ?? "Erro inesperado!";
};
