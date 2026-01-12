import prisma from "@/lib/prisma";

export const getCursos = async () => {
  const cursos = await prisma.curso.findMany({
    orderBy: {
      idCurso: "desc",
    },
  });
  return cursos;
};

export const getCursoById = async (idCurso: number) => {
  const curso = await prisma.curso.findUnique({
    where: {
      idCurso: Number(idCurso),
    },
  });
  return curso;
};
