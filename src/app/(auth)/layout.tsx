import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header/Header";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/");
  // }

  // if (session && session.user.token) {
  //   const token = session.user.token;
  //   const decodedToken: any = jwtDecode(token);

  //   const currentTime = Date.now() / 1000;

  //   if (decodedToken.exp < currentTime) redirect("/");
  // }

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
