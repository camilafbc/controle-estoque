# 📋 Gestor de Estoque Senac - Projeto Integrador

Sistema de controle, consumo e movimentação de estoque desenvolvido como solução institucional para acompanhamento de entradas, saídas e saldos de insumos e produtos por turma e curso do **SENAC**.

<img width="1794" height="889" alt="image" src="https://github.com/user-attachments/assets/bdc1517c-c302-4385-9beb-ba177eef8d95" />


Acesso: 👉 [http://localhost:3000](https://estoque-senac.vercel.app/)

---

## ✨ Características e Arquitetura

A aplicação foi integralmente construída sob os mais modernos padrões de engenharia de software no ecossistema React/Next.js:

- **Next.js 14 com App Router**: Arquitetura unificada e performática, separando claramente responsabilidades entre _Server Components_ (para leitura direta e pré-carregamento) e _Client Components_ (para interatividade refinada).
- **TypeScript em Modo Estrito (`strict: true`)**: Tipagem ponta a ponta sem `any`, garantindo previsibilidade de contratos e segurança em tempo de compilação.
- **Identidade Visual Oficial Senac**: Paleta corporativa refinada com Azul Senac (`#004587` / `hsl(209, 100%, 28%)`) e Laranja Senac (`#F39200` / `hsl(25, 95%, 53%)`), cantos modernos (`rounded-xl` / `rounded-2xl`), suporte completo aos modos **Dark & Light** e layout responsivo com Sidebar retrátil.
- **Autorização Robusta no Servidor (RBAC & Escopo por Curso)**: O perfil de acesso (`admin` vs `user`) e o vínculo com o curso do usuário são validados no servidor em cada Server Action, rota de API e consulta ao banco, prevenindo estritamente acesso cruzado a dados de outros cursos.
- **Camada de Dados com Prisma & PostgreSQL**: Relacionamentos íntegros, integridade referencial e transações atômicas para movimentações de estoque.
- **Cache e Performance com TanStack Query v5**: Hidratação isomórfica no servidor (`HydrationBoundary`), hooks desacoplados em `src/hooks/` e invalidação inteligente de queries.
- **Validação Segura com Zod**: Schemas centralizados em `src/schemas/` para validação de payloads de API, formulários e parâmetros com mensagens amigáveis em português.
- **PWA (Progressive Web App)**: Otimizado com Service Worker para instalação no desktop e dispositivos móveis (smartphones e tablets).

---

## 🎯 Módulos e Funcionalidades

### 📊 Relatório Analítico de Movimentação (Modernizado)

- **Visualização Analítica Interativa em Tela**: Consulta de movimentações diretamente na interface web sem a necessidade de downloads prévios.
- **Painel Executivo de KPIs**: Indicadores em tempo real para:
  - _Itens Movimentados_: Total de produtos envolvidos no período.
  - _Total de Entradas_: Volume acumulado de reposições (`+`).
  - _Total de Saídas_: Volume acumulado de consumo (`-`).
  - _Saldo do Período_: Diferença líquida consolidada.
- **Tabela de Dados com Busca em Tempo Real**: Filtro instantâneo por nome ou fabricante, badges de status/saldo e rodapé com totais consolidados.
- **Presets Ágeis de Período**: Seleção rápida com um clique para _Últimos 7 dias_, _Últimos 30 dias_ e _Mês Atual_, além do seletor flexível com intervalo de datas.
- **Exportação Dupla**:
  - **PDF Institucional Senac**: Diagramação oficial com cores corporativas, logotipo, metadados completos (Curso, Turma, Turno, Período e Emissor), resumo executivo, tabela zebrada e numeração dinâmica de páginas (`Página X de Y`).
  - **Planilha CSV (Excel)**: Exportação instantânea formatada no padrão brasileiro (separador `;` e codificação UTF-8 com BOM para suporte perfeito a caracteres acentuados no Microsoft Excel e Google Sheets).

### 📦 Controle de Produtos e Estoque

- **Cadastro Resiliente com Código de Barras (GTIN/EAN)**: Integração com a API OSCBR v3 para busca automática e enriquecimento de dados cadastrais (descrição, marca e fabricante), com preenchimento assistido que nunca sobrescreve alterações manuais.
- **Movimentações Atômicas de Estoque**: Registro seguro de entradas e saídas/consumo, garantindo consistência transacional e rastreabilidade por usuário e turma.
- **Controle de Validade e Alertas**: Identificação visual de produtos próximos ao vencimento, com estoque baixo ou zerado.

### 👥 Gestão e Perfis de Acesso (RBAC)

- **Perfil Administrador**:
  - Gestão e auditoria de cursos (criação, edição e status).
  - Gerenciamento de usuários da plataforma (administradores e docentes/coordenadores).
  - Acesso irrestrito à visão corporativa de todos os cursos.
- **Perfil Usuário (Coordenação & Docentes)**:
  - Gestão de turmas e turnos específicos do seu curso.
  - Gerenciamento do catálogo de produtos e movimentação do estoque da sua área.
  - Emissão de relatórios e controle de inventário local.

---

## 🛠️ Tecnologias Utilizadas

| Camada                    | Ferramenta / Biblioteca                                |
| :------------------------ | :----------------------------------------------------- |
| **Framework Fullstack**   | Next.js 14 (App Router)                                |
| **Linguagem & Tipagem**   | TypeScript (Modo Estrito)                              |
| **Biblioteca de UI**      | React 18, Tailwind CSS, Shadcn UI, Radix UI Primitives |
| **Ícones & Animações**    | Lucide React, Framer Motion                            |
| **Banco de Dados & ORM**  | PostgreSQL, Prisma ORM                                 |
| **Cache & Estado Server** | TanStack Query v5 (React Query)                        |
| **Formulários & Schemas** | React Hook Form, Zod, Hookform Resolvers               |
| **Autenticação & Sessão** | NextAuth.js com JWT e BCrypt                           |
| **Geração de Documentos** | `@react-pdf/renderer`, Date-fns, Day.js                |
| **PWA**                   | Next-PWA, Service Worker                               |

---

## 📁 Estrutura do Projeto

```text
controle-estoque/
├── prisma/                    # Schema do Prisma, migrações e seed
│   ├── schema.prisma
│   └── seed.ts
├── public/                    # Ativos estáticos, manifest e logos
│   ├── logo.png
│   ├── logo-branco-senac.png
│   └── sw.js
└── src/
    ├── actions/               # Server Actions com validação Zod e autorização
    ├── api/                   # Clientes e chamadas de API (Axios)
    ├── app/                   # Rotas do Next.js App Router
    │   ├── (auth)/            # Rotas autenticadas com Topbar e Sidebar
    │   │   ├── (user)/        # Rotas restritas para perfil Usuário (Curso)
    │   │   │   ├── cadastros/
    │   │   │   ├── home/
    │   │   │   └── relatorios/
    │   │   └── admin/         # Rotas restritas para perfil Administrador
    │   ├── api/               # API Route Handlers protegidos
    │   ├── layout.tsx         # Root layout com tema e providers
    │   └── page.tsx           # Tela de Login pública
    ├── components/            # Componentes reutilizáveis e Shadcn UI
    │   ├── common/            # PageHeader, badges e componentes compartilhados
    │   ├── layout/            # Sidebar, Topbar e navegação
    │   └── ui/                # Primitivos Shadcn (Button, Card, Table, Form, Dialog...)
    ├── hooks/                 # Custom Hooks tipados (useRelatorioMovimentacao, useListFilter...)
    ├── lib/                   # Configurações globais (Prisma, Axios, Auth, NextAuth)
    ├── queries/               # Hooks do TanStack Query para buscas
    ├── schemas/               # Schemas de validação Zod
    ├── services/              # Camada de regras de negócio e consultas Prisma
    ├── types/                 # Interfaces e contratos TypeScript centralizados
    └── utils/                 # Funções utilitárias e tratamento centralizado de erros
```

---

## 🚀 Instalação e Execução Local

Siga o passo a passo abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18.x ou 20.x
- [PostgreSQL](https://www.postgresql.org/) (instalado localmente ou executando via Docker)
- Gerenciador de pacotes `npm`, `pnpm` ou `yarn`

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/camilafbc/controle-estoque.git
cd controle-estoque
```

---

### 2. Instalar Dependências

```bash
npm install
```

> **Nota:** O comando acima executará automaticamente o script `postinstall` configurado para gerar os tipos do Prisma Client (`npx prisma generate`).

---

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Preencha as variáveis de ambiente com suas credenciais:

```env
# URL base da aplicação
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/controle_estoque?schema=public"

# NextAuth & Segurança de Sessão
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua_chave_secreta_jwt_deve_ter_pelo_menos_32_caracteres"
JWT_KEY="sua_chave_secreta_adicional_para_tokens"

# Flag de Modo Desenvolvedor (opcional)
DEVELOPER="1"

# Usuário Administrador Padrão (utilizado pelo seed do banco)
USER_PADRAO_NOME="Administrador Senac"
USER_PADRAO_EMAIL="admin@senac.br"
USER_PADRAO_PASSWORD="SuaSenhaSegura123"

# Integração API GTIN OSCBR v3 (Consulta de Código de Barras)
GTIN_API_USERNAME="seu_usuario_oscbr"
GTIN_API_PASSWORD="sua_senha_oscbr"
```

---

### 4. Executar Migrações e Popular o Banco

Sincronize a estrutura do banco de dados com o schema do Prisma:

```bash
npx prisma db push
```

Popule o banco de dados com o usuário administrador inicial definido no `.env`:

```bash
npx prisma db seed
```

---

### 5. Iniciar a Aplicação em Desenvolvimento

Inicie o servidor local do Next.js:

```bash
npm run dev
```

Abra seu navegador e acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

Para acessar, utilize o e-mail e a senha configurados no seed.

---

## 🧪 Scripts Disponíveis

| Comando              | Descrição                                                                       |
| :------------------- | :------------------------------------------------------------------------------ |
| `npm run dev`        | Inicia o servidor de desenvolvimento com Fast Refresh.                          |
| `npm run build`      | Compila o projeto com validação estrita de tipos e otimização para produção.    |
| `npm run start`      | Inicia o servidor em modo de produção (após o build).                           |
| `npm run lint`       | Executa a verificação estática de código com o ESLint.                          |
| `npx prisma studio`  | Abre a interface gráfica interativa para visualização e edição direta do banco. |
| `npx prisma db seed` | Executa o seed para criação do administrador inicial.                           |

---

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos e institucionais sob a licença [MIT](https://choosealicense.com/licenses/mit/).
