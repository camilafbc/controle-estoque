import WelcomeUser from "@/components/home/WelcomeUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";

import DashboardContent from "./componentes/DashboardContent";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb />
      <WelcomeUser />
      <DashboardContent />
    </div>
  );
}
