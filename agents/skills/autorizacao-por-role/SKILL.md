---
name: autorizacao-por-role
description: "Use ao implementar autenticação, autorização por role, proteção de rotas, escopo por curso/turma ou regras de acesso admin e user no gestor de estoque."
argument-hint: "Descreva o recurso e os roles que devem acessá-lo."
---

# Autorização por role e escopo

## Quando usar

- Proteger páginas, Route Handlers e Server Actions.
- Restringir dados e operações por `admin`, `user`, curso e turma.
- Revisar se uma UI não está sendo usada como único controle de acesso.

## Procedimento

1. Localize a origem confiável da sessão e confirme como o usuário autenticado
   é obtido no servidor.
2. Defina uma matriz explícita de permissões para cada operação.
3. Valide sessão e role no servidor antes de executar Prisma.
4. Aplique `idCurso` e demais escopos derivados da sessão na consulta; ignore
   IDs de escopo usados apenas como filtro de segurança pelo cliente.
5. Retorne `401` para ausência de autenticação e `403` para falta de
   permissão, sem revelar dados protegidos.
6. Replique a regra em páginas, APIs e mutações relacionadas. A ocultação de
   botões é apenas uma melhoria de UX.
7. Teste pelo menos acesso permitido, acesso negado e tentativa de acessar
   outro curso/turma.
