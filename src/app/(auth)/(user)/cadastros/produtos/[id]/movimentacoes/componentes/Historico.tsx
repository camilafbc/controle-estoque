import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Operacao } from "@/types/Operacao";

import { columns } from "./TableColumns";

interface HistoricoMovimentacoesProps {
  data: Operacao[];
  isLoading?: boolean;
}

export default function HistoricoMovimentacoes({
  data,
  isLoading,
}: HistoricoMovimentacoesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Histórico de Movimentações</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data || []} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
