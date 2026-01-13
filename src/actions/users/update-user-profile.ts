"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { userProfileValidationSchema } from "@/schemas/user-profile-schema";

export const updateProfile = async (user: {
  idUser: number;
  nome?: string;
  password?: string;
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Usuário não autorizado." };

    const dataToUpdate: Partial<{ nome: string; password: string }> = {};

    await userProfileValidationSchema.validate(user, { abortEarly: false });

    if (user.nome) {
      dataToUpdate.nome = user.nome;
    }

    if (user.password) {
      dataToUpdate.password = bcrypt.hashSync(user.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { idUser: user.idUser },
      data: dataToUpdate,
    });

    // return updatedUser.nome;
    return {
      message: "Dados atualizados com sucesso!",
      data: updatedUser.nome,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao criar usuário: ", error);
    return { error: "Erro interno do servidor" };
  }
};
