import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hasEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const validateAuth = async (email: string, password: string) => {
  const user = await hasEmail(email);
  if (!user) return false;

  const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!passwordCompare) return false;

  return {
    id: user.idUser,
    name: user.nome,
    email: user.email,
    curso: user.idCurso,
    role: user.role,
  };
};

export const createAccessToken = async (userId: number) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_KEY as string, {
    expiresIn: "15min",
  });
  return token;
};
