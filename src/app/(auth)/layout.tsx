import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header/Header";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="container mx-auto mb-8 mt-4">
        <ToastContainer
          theme="colored"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
        />
        <Suspense fallback={<div className="container mx-auto p-6" />}>
          {children}
        </Suspense>
      </div>
    </>
  );
}
