export function errorMiddleware(err, req, res, next){
  console.error(err); // Loga o erro no console

  let mensagem = "Erro interno no servidor.";

  if (err.code === "ER_DUP_ENTRY") {
    mensagem = "Já existe um registro com esse valor!";
  } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
    mensagem = "O registro referenciado não existe!";
  } else if (err.code === "ER_BAD_NULL_ERROR") {
    mensagem = "Campos obrigatórios não podem estar vazios!";
  }

  res.status(400).json({ error: true, message: mensagem });
};
