---
name: modernizacao-next-prisma
description: "Use ao modernizar telas, APIs ou domínio do gestor de estoque com Next.js App Router, TypeScript strict, Prisma/PostgreSQL, hooks personalizados, Shadcn, formulários, relatórios ou tipagem de dados."
argument-hint: "Informe a tela, rota ou fluxo de estoque a modernizar."
---

# Modernização Next.js e Prisma

## Quando usar

- Evoluir telas do App Router sem perder Server Components.
- Criar ou refatorar hooks personalizados em `src/hooks`.
- Tipar formulários, payloads, respostas e consultas Prisma.
- Modernizar componentes com Shadcn, acessibilidade e estados de UI.
- Criar consultas e relatórios por curso, turma e período.

## Procedimento

1. Leia `AGENTS.md`, `package.json`, o schema Prisma e a implementação do
   fluxo antes de escolher uma abstração.
2. Separe tipos de domínio, validação de entrada, acesso ao banco e UI.
3. Use Server Components para leitura quando possível; mantenha hooks e
   interações em componentes Client pequenos.
4. Extraia somente lógica reutilizável para hooks tipados e documente o
   contrato de entrada/saída no próprio tipo.
5. Use componentes Shadcn existentes e trate loading, erro, vazio e sucesso.
6. Se o schema mudar, crie migration e revise seed, APIs e telas dependentes.
7. Execute `npm run lint` e `npm run build` após a implementação.
