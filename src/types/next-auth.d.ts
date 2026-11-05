import "next-auth";
import "next-auth/jwt";

import { AppRole, AuthUser } from "./AuthUser";

declare module "next-auth" {
  interface User extends Omit<AuthUser, "id"> {
    id: string;
  }

  interface Session {
    user: AuthUser;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    curso?: number;
    role?: AppRole;
  }
}
