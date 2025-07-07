import { GraduationCap } from "lucide-react";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import CursosContainer from "./componentes/CursosContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Cursos", href: "/admin/Cursos" },
        ]}
        homeHref="/admin/home"
      />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <GraduationCap size={28} className="font-bold text-orange-500" />
          <CardTitle>Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <CursosContainer />
        </CardContent>
      </Card>
    </div>
  );
}
