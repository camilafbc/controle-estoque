import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "./prisma";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        // Validate input with Zod
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });
        const parsed = schema.safeParse(credentials);
        if (!parsed.success) {
          console.error("Invalid credentials", parsed.error);
          return null;
        }
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) {
          throw new Error("Usuário não encontrado.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("E-mail ou senha incorretos.");
        }
        return {
          id: String(user.idUser),
          name: user.nome,
          email: user.email,
          curso: user.idCurso ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.curso = user.curso;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user && token.role) {
        session.user.id = Number(token.id);
        session.user.curso = token.curso;
        session.user.role = token.role;
        // keep accessToken if needed in future
        // session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
};
