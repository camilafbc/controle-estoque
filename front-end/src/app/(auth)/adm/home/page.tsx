import MyBreadcrumb from "@/components/MyBreadcrumb";
import DashContainer from "./componentes/DashContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/adm/home" />
      <DashContainer />
    </div>
  );
}
