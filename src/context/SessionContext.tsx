"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";

interface SessionData {
  user: {
    id: number;
    name: string;
    email: string;
    curso: string;
    token?: string;
    role: string;
  } | null;
  loading: boolean;
}

const SessionContext = createContext<SessionData | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<SessionData["user"] | null>(null);
  const loading = status === "loading";

  // useEffect(() => {
  //   if (session) {
  //     setUser(session.user);
  //   } else {
  //     setUser(null);
  //   }
  // }, [session]);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
