import WelcomeUser from "@/components/home/WelcomeUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";

import Dashboard from "./componentes/Dashboard";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb />
      <WelcomeUser />
      <Dashboard />
    </div>
  );
}
