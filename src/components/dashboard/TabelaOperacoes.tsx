import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashLastOperacoes } from "@/queries/dashboard";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

export default function TabelaOperacoes() {
  // const { data: dados, isLoading } = useDashLastOperacoes();
  const dados = [];
  const isLoading = false;

  if (isLoading)
    return (
      <div>
        <ReloadIcon className="mr-2 size-4 animate-spin" />
      </div>
    );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Últimas Movimentações</CardTitle>
        <CardDescription>Últimas 7 movimentações realizadas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Produto</TableHead>
              <TableHead>Operação</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {dados.length > 0 ? (
              dados.map((linha: any, i: number) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="whitespace-nowrap font-medium">
                    {linha.prodDescricao}
                  </TableCell>
                  <TableCell>
                    {linha.tipoOperacao === 0 ? "Saída" : "Entrada"}
                  </TableCell>
                  <TableCell className="text-center">
                    {dayjs(linha.data?.split(" ")[0]).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    {linha.quantidade}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="w-full text-center font-medium"
                >
                  Ainda não há dados a serem exibidos
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
