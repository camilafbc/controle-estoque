// Este arquivo é responsável por popular o banco de dados com dados iniciais.
// Ele deve ser executado após a migração do banco de dados.
// Para executar este arquivo, use o comando:
// npx ts-node prisma/seed.ts
// Ou, se você estiver usando o Prisma CLI:
// npx prisma db seed --preview-feature

import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma";
// const { PrismaClient } = require('@/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Hash da senha
  const passwordHash = await bcrypt.hash("@admin123", 10);

  // Criação do usuário admin sem curso vinculado
  await prisma.user.upsert({
    where: { email: "camiladev19@gmail.com" },
    update: {},
    create: {
      nome: "Camila Dev",
      email: "camiladev19@gmail.com",
      password: passwordHash,
      role: "admin",
      status: true,
      idCurso: null, // <- Sem curso
      created_by: 0, // Pode ser 0 ou null se preferir
    },
  });

  // Popular produtos existentes
  const produtos = await prisma.produto.findMany({
    where: { uuid: null },
  });

  for (const produto of produtos) {
    await prisma.produto.update({
      where: { idProduto: produto.idProduto },
      data: { uuid: crypto.randomUUID() },
    });
  }

  // Popular turmas existentes
  const turmas = await prisma.turma.findMany({
    where: { uuid: null },
  });

  for (const turma of turmas) {
    await prisma.turma.update({
      where: { idTurma: turma.idTurma },
      data: { uuid: crypto.randomUUID() },
    });
  }

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
