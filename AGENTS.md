# Diretrizes do projeto

## Objetivo e domínio

Este sistema acompanha o cadastro, consumo e movimentação de produtos de uma
instituição de ensino. Os dados são organizados por curso e turma e devem
permitir consultas e geração de relatórios confiáveis.

## Stack obrigatória

- Preserve Next.js com App Router, React, TypeScript e PostgreSQL.
- Use Prisma como camada de acesso ao PostgreSQL e mantenha o schema como fonte
  de verdade para modelos e relacionamentos.
- Respeite o TypeScript em modo `strict`; não introduza `any` ou casts para
  mascarar tipos.
- Reutilize a configuração existente do Tailwind e os componentes do Shadcn
  antes de criar componentes visuais próprios.

## Arquitetura e implementação

- Diferencie componentes Server e Client do Next.js. Use `"use client"` apenas
  quando estado, efeitos ou APIs do navegador forem necessários.
- Separe regras de domínio, acesso a dados e apresentação. Rotas de API devem
  validar entrada, autenticar o usuário e aplicar autorização antes de chamar o
  Prisma.
- Extraia lógica repetida de estado e efeitos para hooks personalizados
  tipados, com nomes `use...`, mantendo-os em `src/hooks`.
- Defina tipos para payloads de API, formulários, respostas externas e dados
  exibidos. Valide entradas externas com o padrão já adotado no projeto
  (preferencialmente Zod).
- Preserve os nomes e relacionamentos existentes do Prisma ao evoluir o banco.
  Alterações de schema devem vir acompanhadas de migration e atualização dos
  fluxos afetados.

## Autenticação e autorização

- O `role` do usuário é uma fronteira de segurança, não apenas uma regra de
  interface. Valide-o no servidor em cada rota, ação ou consulta protegida.
- Não confie em `role`, `idCurso` ou filtros enviados pelo cliente. Derive o
  usuário autenticado da sessão e aplique o escopo do curso/turma no banco.
- Retorne respostas HTTP apropriadas para não autenticado (`401`) e sem
  permissão (`403`), sem expor dados de outros cursos.
- A interface pode ocultar ações indisponíveis, mas isso nunca substitui a
  autorização no servidor.

## Produto e interface

- Mantenha uma interface acessível, responsiva e consistente com a identidade
  visual existente. Prefira componentes Shadcn, estados de carregamento,
  vazio e erro explícitos e feedback de sucesso/erro nas mutações.
- Relatórios e indicadores devem deixar claro o curso, a turma, o período e a
  origem dos dados.
- Para cadastro de produto, a busca por código de barras deve ser resiliente:
  validar o código, tratar loading/erro/não encontrado, permitir edição manual
  e nunca sobrescrever dados preenchidos sem confirmação.

## Validação

- Execute `npm run lint` e `npm run build` quando a mudança alcançar código
  correspondente.
- Para alterações de banco, valide a migration e os fluxos de leitura/escrita.
- Atualize documentação diretamente relacionada quando contratos, comandos ou
  comportamento do sistema mudarem.
