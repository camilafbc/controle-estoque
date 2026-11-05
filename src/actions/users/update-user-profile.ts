"use server";

import bcrypt from "bcryptjs";
import { authorizeAuthenticated } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { userProfileValidationSchema } from "@/schemas/user-profile-schema";
import { handleDatabaseError } from "@/utils/handleDbError";
import { getValidationMessages } from "@/utils/getValidationMessages";

interface UpdateProfileInput {
  nome?: string;
  email?: string;
  password?: string;
  confirmaSenha?: string;
}

/**
 * Atualiza o perfil do próprio usuário autenticado. O id é sempre derivado
 * da sessão, nunca do cliente.
 */
export const updateProfile = async (user: UpdateProfileInput) => {
  try {
    const auth = await authorizeAuthenticated();
    if (!auth.ok) return { error: auth.error };

    const dataToUpdate: Partial<{ nome: string; password: string }> = {};

    const validation = userProfileValidationSchema.safeParse(user);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    if (user.nome) {
      dataToUpdate.nome = user.nome.trim();
    }

    if (user.password) {
      dataToUpdate.password = bcrypt.hashSync(user.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { idUser: auth.ctx.userId },
      data: dataToUpdate,
    });

    return {
      message: "Dados atualizados com sucesso!",
      data: updatedUser.nome,
    };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar perfil: ", dbError);
    return { error: dbError.message };
  }
};
