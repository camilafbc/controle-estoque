"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { userActionValidationSchema } from "@/schemas/user-schema";
import { hasUserEmail } from "@/services/users";
import { User } from "@/types/User";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createUser = async (user: Omit<User, "idUser">) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Usuário não autorizado." };

    const userDoing = +session?.user.id;

    await userActionValidationSchema.validate(user, {
      abortEarly: false,
    });

    const userExist = await hasUserEmail(user.email);
    if (userExist) return { error: "E-mail já cadastrado." };

    if (!user.password) return { error: "Senha é obrigatória." };

    const userData = await prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email.toLowerCase(),
        password: bcrypt.hashSync(user.password, 10),
        role: user.role,
        created_by: userDoing,
        status: user.status,
        idCurso: user.role === "admin" ? null : user.idCurso,
      },
    });

    return { message: "Usuário criado com sucesso!", data: userData };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar usuário: ", dbError);
    return { error: dbError.message };
  }
};
