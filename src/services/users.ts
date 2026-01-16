import prisma from "@/lib/prisma";

export const getUsers = async (idLogado: number) => {
  const hideIds = [Number(process.env.DEVELOPER), +idLogado];

  const users = await prisma.user.findMany({
    where: {
      idUser: {
        notIn: hideIds,
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

export const countUsers = async () => {
  const count = await prisma.user.count({
    where: {
      status: true,
    },
  });

  return count - 1 < 0 ? 0 : count - 1;
};

export const hasUserEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.trim(),
    },
  });
  return user ? true : false;
};
