"use server";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cursoUpdateSchema } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";

export const updateCurso = async (curso: Curso) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin")
      return { error: "Usuário não autorizado" };

    await cursoUpdateSchema.validate(curso, {
      abortEarly: false,
    });

    const cursoUpdated = await prisma.curso.update({
      where: {
        idCurso: Number(curso.idCurso),
      },
      data: {
        nomeCurso: curso.nomeCurso.trim(),
        status: curso.status,
      },
    });
    return cursoUpdated;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.log("ERRORS: ", error.errors);
      return { error: "Dados inválidos", message: error.errors };
    }

    console.error("Erro ao atualizar dados de curso: ", error);
    return { error: "Erro interno do servidor" };
  }
};
