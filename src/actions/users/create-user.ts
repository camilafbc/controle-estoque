"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { userValidationSchema } from "@/schemas/user-schema";
import { hasUserEmail } from "@/services/users";
import { User } from "@/types/User";

// export const createUser = async (user: Omit<User, "idUser">) => {
//   const session = await getServerSession(authOptions);

//   if (!session) return { error: "Usuário não autorizado." };

//   const userDo = session?.user.id;

//   console.log("USER: ", user);
//   console.log("USERDO: ", userDo);

//   const userData = await prisma.user.create({
//     data: {
//       nome: user.nome,
//       email: user.email.toLowerCase(),
//       password: bcrypt.hashSync(user.password as string, 10),
//       role: user.role,
//       created_by: userDo,
//       status: user.status,
//       idCurso: user.idCurso,
//     },
//   });

//   return userData;
// };

export const createUser = async (user: Omit<User, "idUser">) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Usuário não autorizado." };

    const userDo = session?.user.id;

    await userValidationSchema.validate(user, { abortEarly: false });

    const userExist = await hasUserEmail(user.email);
    if (userExist) return { error: "E-mail já cadastrado." };

    if (!user.password) return { error: "Senha é obrigatória." };

    const userData = await prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email.toLowerCase(),
        password: bcrypt.hashSync(user.password, 10),
        role: user.role,
        created_by: userDo,
        status: user.status,
        idCurso: user.idCurso,
      },
    });

    console.log("USER: ", user);
    console.log("USERDATA: ", userData);

    return { message: "Usuário criado com sucesso!", data: userData };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao criar usuário: ", error);
    return { error: "Erro interno do servidor" };
  }
};
