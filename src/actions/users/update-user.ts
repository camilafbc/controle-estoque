"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { userValidationSchema } from "@/schemas/user-schema";
import { User } from "@/types/User";
import { handleDatabaseError } from "@/utils/handleDbError";
import { getValidationMessages } from "@/utils/getValidationMessages";

export const updateUser = async (user: Partial<User>) => {
  try {
    // Somente administradores podem alterar dados, role e curso de usuários
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    if (!user.idUser) return { error: "Usuário não selecionado." };

    const validationSchema = userValidationSchema.omit(["confirmaSenha"]);

    const validation = validationSchema.safeParse(user);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    const dataToUpdate: Prisma.UserUncheckedUpdateInput = {
      nome: user.nome,
      email: user.email?.toLowerCase(),
      status: user.status,
      role: user.role,
      idCurso: user.role === "user" && user.idCurso ? user.idCurso : null,
    };

    if (user.password) {
      dataToUpdate.password = bcrypt.hashSync(user.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { idUser: user.idUser },
      data: dataToUpdate,
    });

    return { message: "Dados atualizados com sucesso!", data: updatedUser };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar usuário: ", dbError);
    return { error: dbError.message };
  }
};
