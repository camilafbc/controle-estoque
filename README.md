# 📋 Gestor de Estoque Senac - Projeto Integrador

Sistema de controle, consumo e movimentação de estoque desenvolvido como solução para acompanhamento de entradas e saídas de insumos e produtos por turma e curso do SENAC MG.

<img width="100%" src="https://raw.githubusercontent.com/camilafbc/controle-estoque/refs/heads/main/to_readme.jpeg" alt="Gestor de Estoque Senac" />

---

## ✨ Características e Modernização

A aplicação é construída sob uma arquitetura moderna, escalável e segura:

- **Fullstack Next.js App Router**: Aplicação unificada sem separação legada de pastas, com separação clara de Server e Client Components.
- **Identidade Visual Contemporânea**: Paleta oficial com azul institucional (`hsl(209, 100%, 28%)`) e laranja Senac (`hsl(25, 95%, 53%)`), cantos modernos (`rounded-xl` / `rounded-2xl`), suporte completo a Dark/Light Mode e layout com Sidebar colapsável.
- **Autorização Robusta e Escopo no Servidor**: O perfil (`role`) e o vínculo do curso do usuário são validados diretamente no servidor em cada Server Action e rota de API, prevenindo acesso cruzado a dados de outros cursos.
- **Validação Segura com Zod**: Schemas tipados e centralizados em `src/schemas/` substituindo a validação legada, com mensagens amigáveis em português.
- **Camada de Dados com Prisma & PostgreSQL**: Relacionamentos íntegros, transações atômicas para movimentações de estoque e tipagem end-to-end com TypeScript em modo `strict`.
- **Performance e Cache com TanStack Query v5**: Hidratação de dados no servidor (`HydrationBoundary`), hooks desacoplados em `src/hooks/` e `src/queries/` e invalidação inteligente de cache.
- **PWA (Progressive Web App)**: Totalmente responsivo para smartphones, tablets e desktop, com service worker configurado.

---

## 🎯 Funcionalidades

### 🔐 Autenticação e Perfis (RBAC)
- **Perfil Administrador**:
  - Gestão de cursos (criação, edição e status).
  - Gestão de usuários (administradores e usuários de cursos).
  - Visão geral gerencial de todos os cursos da unidade.
- **Perfil Usuário (Coordenação/Docente)**:
  - Gestão de turmas com turnos e códigos específicos do seu respectivo curso.
  - Cadastro de produtos por código de barras, fabricante, validade e alertas de estoque baixo/zerado.
  - Registro ágil de movimentações (entrada, saída/consumo e devolução).
  - Emissão de relatórios em PDF com filtro por período e turma.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router), React 18, TypeScript (Strict Mode)
- **Estilização & UI**: Tailwind CSS, Shadcn UI, Radix UI Primitives, Lucide Icons
- **Banco de Dados & ORM**: PostgreSQL, Prisma ORM
- **Gerenciamento de Estado de Servidor**: TanStack Query (React Query v5)
- **Formulários & Validação**: React Hook Form, Zod
- **Autenticação**: NextAuth.js com JWT e senhas criptografadas com BCrypt
- **Relatórios**: `@react-pdf/renderer`

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18+ ou 20+
- Instância do PostgreSQL rodando localmente ou via container Docker

### 1. Clonar o Repositório
```bash
git clone https://github.com/camilafbc/controle-estoque.git
cd controle-estoque
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com base nas seguintes configurações:

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/controle_estoque?schema=public"

# NextAuth & Segurança
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua_chave_secreta_jwt_deve_ter_pelo_menos_32_caracteres"
JWT_KEY="sua_chave_secreta_adicional"

# Configuração de Administrador
DEVELOPER="1"

# API GTIN OSCBR (V3)
GTIN_API_USERNAME="seu_usuario"
GTIN_API_PASSWORD="sua_senha"
```

### 4. Executar Migrações e Seed do Banco
Gere o Prisma Client e sincronize a estrutura com o PostgreSQL:

```bash
npx prisma generate
npx prisma db push
```

*(Opcional)* Popule o banco com dados iniciais:
```bash
npm run seed
# ou: npx tsx prisma/seed.ts
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção com verificação estrita de tipos e otimização de páginas.
- `npm run start`: Inicia o servidor Node.js em modo de produção.
- `npm run lint`: Executa a verificação estática do ESLint.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e institucionais sob licença [MIT](https://choosealicense.com/licenses/mit/).
