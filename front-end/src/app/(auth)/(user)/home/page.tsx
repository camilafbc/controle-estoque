import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import DashboardContent from "./componentes/DashboardContent";
import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";

export default function Page() {
  return (
    <>
      <MyBreadcrumb />
      <BadgePageTitle title="Dashboard" />
      <Separator orientation="horizontal" className="mb-4" />
      <DashboardContent />
    </>
  );
}
