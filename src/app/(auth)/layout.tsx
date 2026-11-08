import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar Desktop fixa */}
      <div className="hidden w-64 shrink-0 md:block">
        <Sidebar />
      </div>

      {/* Conteúdo com Topbar e Scroll independente */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <ToastContainer
              theme="colored"
              position="bottom-right"
              autoClose={4000}
              hideProgressBar={true}
            />
            <Suspense fallback={<div className="p-6" />}>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
