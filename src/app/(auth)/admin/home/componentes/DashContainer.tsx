"use client";

import axios from "axios";
import { GraduationCap, User } from "lucide-react";
import { useEffect, useState } from "react";

import DashCard from "@/components/dashboard/DashCard";
import { AnimatedCard } from "@/components/effects/AnimatedCard";
import { useSessionContext } from "@/context/AuthContext";

export default function DashContainer() {
  // const userTeste = useSessionContext();

  const [usersCount, setUsersCount] = useState();
  const [loadingUserCount, setLoadingUserCount] = useState<boolean>(true);

  const [cursosCount, setCursosCount] = useState();
  const [loadingCursoCount, setLoadingCursoCount] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("/api/admin/users/count");
        setUsersCount(response.data.count);
      } catch (error: any) {
        console.error(
          "Erro ao buscar quantidade de usuários:",
          error.response?.data?.message || error.message,
        );
      } finally {
        setLoadingUserCount(false);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchCursosCount = async () => {
      try {
        const response = await axios.get("/api/admin/cursos/count");
        setCursosCount(response.data.count);
      } catch (error: any) {
        console.error(
          "Erro ao buscar quantidade de cursos:",
          error.response?.data?.message || error.message,
        );
      } finally {
        setLoadingCursoCount(false);
      }
    };

    fetchCursosCount();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <DashCard
        delay={0}
        className="bg-card"
        title="Cursos"
        subtitle="Cursos ativos"
        data={String(cursosCount)}
        loading={loadingCursoCount}
      >
        <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
          <GraduationCap />
        </div>
      </DashCard>
      <DashCard
        delay={1}
        className="bg-card"
        title="Usuários"
        subtitle="Usuários ativos"
        data={String(usersCount)}
        loading={loadingUserCount}
      >
        <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
          <User />
        </div>
      </DashCard>
    </div>
  );
}
