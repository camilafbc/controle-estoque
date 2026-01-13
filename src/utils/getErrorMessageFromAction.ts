export const getErrorMessageFromAction = (data: any) => {
  const mensagens = Array.isArray(data.message)
    ? data.message.join(", ")
    : data.message;
  return mensagens;
};
