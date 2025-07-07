import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          },
        );

        if (!response.ok) return null;

        const data = await response.json();

        if (data.user) {
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            curso: data.user.curso,
            role: data.user.role,
          };
        }
        return null;
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
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as unknown as number,
          name: token.name as string,
          email: token.email as string,
          curso: token.curso as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },

  // Configuração importante dos cookies
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 4, // 4 horas
      },
    },
  },

  // providers: [
  //   CredentialsProvider({
  //     id: "credentials",
  //     credentials: {
  //       email: { label: "E-mail", type: "text" },
  //       password: { label: "Senha", type: "password" },
  //     },
  //     authorize: async (credentials) => {
  //       if (credentials) {
  //         const response = await axios.post(
  //           `${process.env.NEXTAUTH_URL}/api/auth/signin`,
  //           {
  //             email: credentials?.email,
  //             password: credentials?.password,
  //           },
  //         );

  //         console.log("Response from login:", response.data);

  //         if (response.data.user) {
  //           return {
  //             id: response.data.user.id,
  //             name: response.data.user.name,
  //             email: response.data.user.email,
  //             curso: response.data.user.curso,
  //             role: response.data.user.role,
  //             token: response.data.token,
  //           };
  //         } else {
  //           return null;
  //         }
  //       } else {
  //         console.log("Não recebeu credenciais");
  //         return null;
  //       }
  //     },
  //   }),
  // ],
  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     console.log("USER JWT: ", user);
  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //       token.curso = user.curso;
  //       token.role = user.role;
  //       token.accessToken = user.token; // Adiciona o token JWT vindo do back-end
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     // console.log("USER SESSION: ", user);
  //     console.log("TOKEN SESSION: ", token);

  //     if (token) {
  //       session.user = {
  //         id: token.id as unknown as number,
  //         name: token.name as string,
  //         email: token.email as string,
  //         curso: token.curso as string,
  //         role: token.role as string,
  //       };
  //       session.accessToken = token.accessToken as string;
  //     }

  //     console.log("Session: ", session);

  //     return session;
  //   },
  // },
};
