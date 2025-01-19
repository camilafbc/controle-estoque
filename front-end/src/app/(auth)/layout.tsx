import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Header from "@/components/header/Header";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  if (session && session.user.token) {
    const token = session.user.token;
    const decodedToken: any = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) redirect("/");
  }

  console.log("Layout protegidas montado.");

  return (
    <>
      {/* <ProvidersWrapper> */}
      <Header />
      <div className="container mx-auto mb-8 mt-4">
        <ToastContainer
          theme="colored"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
        />
        {children}
      </div>
      {/* </ProvidersWrapper> */}
    </>
  );
}
