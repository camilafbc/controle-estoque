import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import ProductContainer from "./componentes/ProductContainer";
import BadgePageTitle from "@/components/BadgePageTitle";

export default function ProdutosPage() {
  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Produtos", href: "/cadastros/produtos" },
        ]}
      />
      <BadgePageTitle title="Produtos" />
      <Separator orientation="horizontal" className="mb-4" />
      <ProductContainer />
    </div>
  );
}
