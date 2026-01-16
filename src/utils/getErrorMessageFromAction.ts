export const getErrorMessageFromAction = (data: any) => {
  console.log("ERROR: ", data);
  const mensagens = Array.isArray(data.message)
    ? data.message.join(", ")
    : data.message;
  return mensagens ?? data.error;
};
