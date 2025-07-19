import WelcomeUser from "@/components/home/WelcomeUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";

import DashBoard from "./componentes/Dahsboard";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/adm/home" />
      <WelcomeUser />
      <DashBoard />
    </div>
  );
}
