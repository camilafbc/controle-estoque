"use server";

import bcrypt from "bcryptjs";

import { Prisma } from "@/generated/prisma";
import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { userUpdateValidationSchema } from "@/schemas/user-schema";
import { User } from "@/types/User";
import { getValidationMessages } from "@/utils/getValidationMessages";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateUser = async (user: Partial<User>) => {
  try {
    // Somente administradores podem alterar dados, role e curso de usuários
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    if (!user.idUser) return { error: "Usuário não selecionado." };

    const validation = userUpdateValidationSchema.safeParse(user);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    const dataToUpdate: Prisma.UserUncheckedUpdateInput = {};
    const validatedUser = validation.data;

    if (validatedUser.nome !== undefined) dataToUpdate.nome = validatedUser.nome;
    if (validatedUser.email !== undefined) {
      dataToUpdate.email = validatedUser.email.toLowerCase();
    }
    if (validatedUser.status !== undefined) {
      dataToUpdate.status = validatedUser.status;
    }
    if (validatedUser.role !== undefined) {
      dataToUpdate.role = validatedUser.role;
      dataToUpdate.idCurso =
        validatedUser.role === "user" ? validatedUser.idCurso ?? null : null;
    } else if (validatedUser.idCurso !== undefined) {
      dataToUpdate.idCurso = validatedUser.idCurso;
    }

    if (validatedUser.password !== undefined) {
      dataToUpdate.password = bcrypt.hashSync(validatedUser.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { idUser: validatedUser.idUser },
      data: dataToUpdate,
    });

    return { message: "Dados atualizados com sucesso!", data: updatedUser };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar usuário: ", dbError);
    return { error: dbError.message };
  }
};
