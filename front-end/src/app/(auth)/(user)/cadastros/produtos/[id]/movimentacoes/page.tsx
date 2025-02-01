import { Separator } from "@/components/ui/separator";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import BadgePageTitle from "@/components/BadgePageTitle";
import MovimentacoesContainer from "./componentes/MovimentacoesContainer";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Produtos", href: "/cadastros/produtos" },
          { label: "Movimentações" },
        ]}
      />
      <BadgePageTitle title="Movimentações" />
      <Separator orientation="horizontal" className="mb-4" />
      <MovimentacoesContainer />
    </div>
  );
}
