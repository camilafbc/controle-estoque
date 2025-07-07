import { GraduationCap } from "lucide-react";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TurmasContainer from "./componentes/TurmasContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb listItems={[{ label: "Cadastros" }, { label: "Turmas" }]} />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <GraduationCap size={28} className="font-bold text-orange-500" />
          <CardTitle>Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <TurmasContainer />
        </CardContent>
      </Card>
    </div>
  );
}
