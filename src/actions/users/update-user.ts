"use server";

import prisma from "@/lib/prisma";
import { User } from "@/types/User";

export const updateUser = async (user: Partial<User>, idUser: number) => {
  const dataToUpdate: any = {
    nome: user.nome,
    email: user?.email?.toLowerCase(),
    status: user.status,
    role: user.role,
  };

  if (user.password) {
    dataToUpdate.password = user.password;
  }

  if (user.role === "user" && user.idCurso) {
    dataToUpdate.idCurso = user.idCurso;
  } else {
    dataToUpdate.idCurso = null;
  }

  const updatedUser = await prisma.user.update({
    where: { idUser: user.idUser },
    data: dataToUpdate,
  });

  return updatedUser;
};
