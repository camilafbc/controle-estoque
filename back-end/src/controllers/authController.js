import { openDb } from "../db/dbConfig.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from "../models/userModel.js";


export async function login(req, res){
  const { email, senha } = req.body

  console.log("Chegando pra logar: ", req.body)

  if(typeof email !== 'string' || typeof senha !== 'string'){
   return res.status(400).json({message: "Todos os campos são obrigatórios!"})
  };

  const userExist = await userModel.findUserByEmail(email.trim())

  if(!userExist){
    return res.status(401).json({message: "Usuário não encontrado ou senha inválida."})
  };

  
  const user = await userModel.getUserById(userExist.idUser)
  const isValidPassword = bcrypt.compareSync(senha, user.senha.trim())
  if (!isValidPassword){
    return res.status(401).json({message: "Usuário não encontrado ou senha inválida."})
  };

  const token = jwt.sign({id: user.idUser, email: user.email, role: user.role }, process.env.JWT_KEY, {expiresIn: '24h'});
  res.status(200).json({ token, id: user.idUser, nome: user.nome, email: user.email, curso: user.nomeCurso, role: user.role });
  
  if(token){
    console.log("Usuário logado!", user)
  } else {
    console.log("Usuário não encontrado!")
  }

};
