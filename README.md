# 📋 Controle de Estoque - Projeto Integrador SENAC MG

Este projeto é uma aplicação de controle de estoque desenvolvida como parte do projeto integrador do curso Técnico em Desenvolvimento de Sistemas do SENAC MG, unidade Lavras. A aplicação foi criada para atender a uma demanda dos cursos de Estética e Cabeleireiro da instituição, que precisavam de um sistema para registrar a entrada e saída de produtos por turma, visando o controle de estoque e o acompanhamento do consumo de produtos por turma e por período.

<img width="100%" src="https://raw.githubusercontent.com/camilafbc/controle-estoque/refs/heads/main/to_readme.jpeg"/>

# Visão Geral

A aplicação conta com uma área administrativa para o cadastro de usuários e cursos, permitindo que o sistema seja usado por outros cursos. A área comum do sistema possibilita o cadastro de turmas e produtos, além de registrar entradas e saídas de produtos, gerando relatórios de movimentação.

# Funcionalidades

* Área Administrativa:
    - Cadastro de usuários (diretoria) e cursos.
    - Autonomia para a instituição utilizar o sistema com diferentes cursos.
* Área Comum:
    - Cadastro de turmas e produtos.
    - Registro de movimentações de entrada e saída de produtos por turma.
    - Geração de relatório de movimentação por turma, com controle de consumo de produtos por período.
* Geral:
    - Suporte PWA para acesso e uso em dispositivos móveis
    - Edição de dados de perfil
    - Escolha de tema (Claro, Escuro ou Sistema)
 
# Tecnologias Utilizadas

* Frontend: Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion
* Backend: APIs integradas no Next.js, Node.js, Express, Prisma
* Banco de Dados: PostgreSQL
* Consumo de dados otimizado com fetch do Next.js e TanStack Query
* Validações e segurança com React Hook Form, Yup e BCrypt
* Zustand para gerenciamento de estado
* Relatórios em PDF com React PDF


# Instalação

Para configurar o projeto localmente, siga as etapas abaixo:

1. Clonando o repositório
Clone o repositório para seu ambiente local:

````bash
git clone https://github.com/camilafbc/controle-estoque/.git
````
2. Instalando Dependências

No diretório raiz do projeto, instale as dependências do frontend e do backend:

* Frontend:
````bash
cd frontend
npm install
````
* Backend:
````bash
cd backend
npm install
````

3. Configuração de Variáveis de Ambiente

Antes de iniciar a aplicação, é necessário configurar as variáveis de ambiente para o frontend e backend. Arquivos de exemplo .env.example foram disponibilizados em ambos os diretórios.

* Backend
No diretório backend, renomeie o arquivo .env.example para .env e preencha os seguintes valores:

````bash
PORT=5000                 # Porta onde o servidor será executado
NODE_ENV=development       # Ambiente de execução (development, production)
JWT_KEY=                   # Chave secreta para geração de tokens JWT
MYSQL_URL=                 # URL de conexão com o banco de dados MySQL
````

* Frontend
No diretório frontend, renomeie o arquivo .env.example para .env.local e preencha os seguintes valores:

````bash
NEXT_PUBLIC_BASE_URL= #
NEXT_PUBLIC_CUSTOM_COOKIE= #
NEXT_CUSTOM_COOKIE= #
NEXTAUTH_URL= http://localhost:3000
NEXTAUTH_SECRET= #
JWT_KEY= #
DATABASE_URL= #
````

Preencha também as variáveis do arquivo seed.ts para criar um usuário na base

4. Rodando o Projeto

Para rodar a aplicação:

````bash
cd ../controle-estoque
npm start
````

A aplicação estará disponível em http://localhost:3000

# Licença

Este projeto está licenciado sob a Licença [MIT](https://choosealicense.com/licenses/mit/) 
