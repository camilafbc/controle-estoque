import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";

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
import { cn } from "@/lib/utils";

interface TableOperacoesProps {
  data: any[];
  isLoading: boolean;
  className?: string;
  delay: number;
}

export default function TableOperacoes({
  data,
  isLoading,
  className,
  delay,
}: TableOperacoesProps) {
  if (isLoading)
    return (
      <div>
        <ReloadIcon className="mr-2 size-4 animate-spin" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: delay * 0.1, duration: 0.5, ease: "backOut" },
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300 },
      }}
      className={cn("w-full", className)}
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Últimas Movimentações</CardTitle>
          <CardDescription className="text-xs">
            Últimas 7 movimentações realizadas
          </CardDescription>
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
              {data.length > 0 ? (
                data.map((linha: any, i: number) => (
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
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
