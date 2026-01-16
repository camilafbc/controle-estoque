"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { userValidationSchema } from "@/schemas/user-schema";
import { User } from "@/types/User";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateUser = async (user: Partial<User>) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Usuário não autorizado." };

    await userValidationSchema.validate(user, {
      abortEarly: false,
      context: { isEdit: true },
    });

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

    return { message: "Dados atualizados com sucesso!", data: updatedUser };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar usuário: ", dbError);
    return { error: dbError.message };
  }
};
