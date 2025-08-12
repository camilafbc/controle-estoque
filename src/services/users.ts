import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      idUser: {
        not: 1,
      },
    },
    select: {
      idUser: true,
      nome: true,
      email: true,
      role: true,
      status: true,
      curso: {
        select: {
          idCurso: true,
          nomeCurso: true,
        },
      },
    },
    orderBy: {
      idUser: "desc",
    },
  });

  return users;
};

export const getUserById = async (idUser: number) => {
  const user = await prisma.user.findUnique({
    where: {
      idUser: Number(idUser),
    },
    select: {
      idUser: true,
      nome: true,
      email: true,
      role: true,
      status: true,
      curso: {
        select: {
          idCurso: true,
          nomeCurso: true,
        },
      },
    },
  });

  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: any,
  created_by: number,
  status: boolean,
  idCurso?: any,
) => {
  const user = await prisma.user.create({
    data: {
      nome: name,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      role,
      created_by,
      status,
      ...(idCurso && {
        curso: {
          connect: { idCurso },
        },
      }),
    },
  });

  return user;
};

export const countUsers = async () => {
  const count = await prisma.user.count({
    where: {
      status: true,
    },
  });

  return count;
};

export const deleteUser = async (idUser: number) => {
  const user = await prisma.user.delete({
    where: {
      idUser: Number(idUser),
    },
  });
  return user;
};

export const updateUser = async (user: {
  idUser: number;
  nome: string;
  email: string;
  status: boolean;
  role: "admin" | "user";
  idCurso?: number;
  password?: string;
}) => {
  const dataToUpdate: any = {
    nome: user.nome,
    email: user.email.toLowerCase(),
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

export const hasUserEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.trim(),
    },
  });
  return user ? true : false;
};

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
