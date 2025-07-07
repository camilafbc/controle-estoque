import { Users } from "lucide-react";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import UsersContainer from "./componentes/UsersContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Usuários", href: "/admin/cadastros/usuarios" },
        ]}
        homeHref="/admin/home"
      />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <Users size={28} className="font-bold text-orange-500" />
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersContainer />
        </CardContent>
      </Card>
    </div>
  );
}
