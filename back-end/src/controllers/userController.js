import { userModel } from "../models/userModel.js";

export async function listUsers(req, res){

  try {
    const users = await userModel.listUsers();
    return res.status(200).json(users);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
  
};

export async function countUsers(req, res){

  try {
    const result = await userModel.countUsers();
    return res.status(200).json(result);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function getUserById(req, res){
  const { id } = req.params

  try {
    const user = await userModel.getUserById(id)
    return res.status(200).json(user);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
};

export async function insertUser(req, res) {
  const idUser = req.user.idUser; 
  const roleUser = req.user.role;
  const { user } = req.body; 

  console.log("req.body:", JSON.stringify(req.body, null, 2)); 

  // Checando se o usuário tem permissão para cadastrar
  if (roleUser !== "admin") {
    return res.status(403).json({ message: "Usuário não tem autorização para acessar esse recurso!" });
  }

  // Validando se todos os campos necessários foram preenchidos
  if (!user || !user.nome || !user.email || !user.senha || !user.role) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  // Validando se todos os campos necessários foram preenchidos
  if (user.role === "user" && !user.idCurso) {
    return res.status(400).json({ message: "Campo 'curso' é obrigatório para tipo 'usuário'!" });
  }

  try {
    // Passando todos os dados corretamente para a função createUser
    await userModel.createUser({
      ...user, // Dados do usuário
      created_by: idUser // ID do usuário que está criando
    });
    res.status(201).json({ message: "Usuário cadastrado!" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: `Erro: ${error.message}` });
  }
};

export async function updateUser(req, res) {
  //console.log("CHEGOU: ", req.body)
  const user = req.body;
  //console.log("CHEGOU: ", user)

  // Verifica se os campos obrigatórios estão presentes
  if (!user || !user.nome || !user.email) {
    return res.status(400).json({ message: "Nome, email e curso são obrigatórios!" });
  }

  // Verifica se a senha foi fornecida e se tem pelo menos 6 caracteres
  if (user.senha && user.senha.length < 6) {
    return res.status(400).json({ message: "A senha deve ter no mínimo 6 caracteres!" });
  }

  try {
    // Se a senha foi fornecida, faz o hash, caso contrário, mantém a atual
    let senhaHash = user.senha ? bcrypt.hashSync(user.senha, 10) : undefined;

    // Atualiza o usuário no banco, passando o hash da senha se fornecida
    const updateUser = await userModel.updateUser(user, senhaHash);
    
    if (updateUser > 0) {
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Erro ao atualizar usuário." });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro: ${error.message}` });
  }
};

export async function deleteUser(req, res){
  const { id } = req.params

  try {
    const delUser = await userModel.deleteUser(id)
    // console.log("DelTurma: " + delCurso)
    if(delUser > 0){
      return res.status(200).json({message: "Usuário deletado com sucesso!"})
    } else {
      return res.status(500).json({message: "Erro ao deletar deletar usuário!"})
    }
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
};