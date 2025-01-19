import NextAuth from "next-auth";
import { AuthUser } from "./AuthUser";

declare module "next-auth" {
  // interface Session {
  //   user: AuthUser;
  // }

  interface User extends AuthUser {}

  interface Session {
    user: AuthUser;
    accessToken: string;
  }

  interface JWT {
    id: number;
    name: string;
    email: string;
    curso: string | null;
    role: string;
    accessToken: string;
  }
}
