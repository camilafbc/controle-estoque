import axios, { AxiosError } from "axios";
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

        try {
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
        } catch (error) {
          const axiosError = error as AxiosError<Error>;

          if (
            axiosError.code === "ECONNREFUSED" ||
            "ERR_BAD_RESPONSE" ||
            "ERR_BAD_REQUEST"
          ) {
            throw new Error("Erro de conexão com o servidor. Tente novamente.");
          }

          if (axiosError.code === "ECONNABORTED") {
            throw new Error("Tempo de espera excedido. Tente novamente.");
          }

          if (axiosError.response?.data.message) {
            throw new Error(axiosError.response?.data.message);
          }

          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.curso = user.curso;
        token.role = user.role;
      }

      if (trigger == "update") {
        token.name = session.user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as unknown as number,
          name: token.name as string,
          email: token.email as string,
          curso: token.curso as number,
          role: token.role as string,
        };
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: "next-auth.senac-estoque-session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 4, // 4 horas
      },
    },
  },
};
