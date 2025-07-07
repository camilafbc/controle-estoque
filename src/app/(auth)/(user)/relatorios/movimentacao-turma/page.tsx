import { Card, CardContent } from "@/components/ui/card";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import MovTurmaContainer from "./componentes/MovTurmaContainer";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Relatórios" },
          { label: "Mov. por turma", href: "/relatorios/movimentacao-turma" },
        ]}
      />
      <h2 className="mt-4 text-lg font-bold md:text-2xl">
        Relatório de Movimentação por Turma
      </h2>
      <Separator orientation="horizontal" className="mb-4" />
      <Card>
        <CardContent className="py-8">
          <MovTurmaContainer />
        </CardContent>
      </Card>
    </div>
  );
}
