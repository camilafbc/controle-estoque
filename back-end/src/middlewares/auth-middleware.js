import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js'; 

export async function ensureAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  console.log('Pegou o token: ', token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('Decodificou o token: ', decoded)
    const user = await userModel.getUserById(decoded.id); 
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: `Erro: ${err.message}` });
  }
}

