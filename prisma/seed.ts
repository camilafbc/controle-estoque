// Este arquivo é responsável por popular o banco de dados com dados iniciais.
// Ele deve ser executado após a migração do banco de dados.
// Para executar este arquivo, use o comando:
// npx ts-node prisma/seed.ts
// Ou, se você estiver usando o Prisma CLI:
// npx prisma db seed --preview-feature

import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();
const nome = process.env.USER_PADRAO_NOME;
const email = process.env.USER_PADRAO_EMAIL;
const password = process.env.USER_PADRAO_PASSWORD;

async function main() {
  // Hash da senha
  const passwordHash = await bcrypt.hash(password as string, 10);

  // Criação do usuário admin sem curso vinculado
  await prisma.user.upsert({
    where: { email: "camiladev19@gmail.com" },
    update: {},
    create: {
      // INSERIR NOME
      nome: nome as string,
      email: email as string,
      password: passwordHash,
      role: "admin",
      status: true,
      idCurso: null,
      created_by: 0,
    },
  });

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
