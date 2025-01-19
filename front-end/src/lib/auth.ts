import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "./axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials) {
          const response = await api.post("/auth/login", {
            email: credentials?.email,
            senha: credentials?.password,
          });

          if (response.data.token) {
            return {
              id: response.data.id,
              name: response.data.nome,
              email: response.data.email,
              curso: response.data.curso,
              role: response.data.role,
              token: response.data.token,
            };
          } else {
            return null;
          }
        } else {
          console.log("Não recebeu credenciais");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.curso = user.curso;
        token.role = user.role;
        token.accessToken = user.token; // Adiciona o token JWT vindo do back-end
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as number,
          name: token.name as string,
          email: token.email as string,
          curso: token.curso as string,
          role: token.role as string,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

// export const authOptions: AuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       credentials: {
//         email: { label: "E-mail", type: "text" },
//         password: { label: "Senha", type: "password" },
//       },
//       authorize: async (credentials, req) => {
//         if (credentials) {
//           const response = await api.post("/auth/login", {
//             email: credentials?.email,
//             senha: credentials?.password,
//           });
//           //console.log("response", response);
//           // return response.data

//           if (response.data.token) {
//             return {
//               id: response.data.id,
//               name: response.data.nome,
//               email: response.data.email,
//               curso: response.data.curso,
//               role: response.data.role,
//               token: response.data.token, // Armazena o token no objeto de usuário
//             };
//           } else {
//             return null;
//           }
//         } else {
//           console.log("Não recebeu credenciais");
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.user;
//         // token.accessToken = user.token as AuthUser;
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       if (token) {
//         session.user = token.user as AuthUser;
//       }
//       return session;
//     },
//   },
// };
