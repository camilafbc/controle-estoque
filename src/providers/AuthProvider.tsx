"use client";

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProvider;
