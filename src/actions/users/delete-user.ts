"use server";

import prisma from "@/lib/prisma";

export const deleteUser = async (idUser: number) => {
  const user = await prisma.user.delete({
    where: {
      idUser: Number(idUser),
    },
  });
  return user;
};
