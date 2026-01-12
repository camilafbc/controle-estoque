"use server";

import prisma from "@/lib/prisma";

export const updateProfile = async (user: {
  idUser: number;
  nome?: string;
  password?: string;
}) => {
  const dataToUpdate: Partial<{ nome: string; password: string }> = {};

  if (user.nome) {
    dataToUpdate.nome = user.nome;
  }

  if (user.password) {
    dataToUpdate.password = user.password;
  }

  const updatedUser = await prisma.user.update({
    where: { idUser: user.idUser },
    data: dataToUpdate,
  });

  return updatedUser.nome;
};
