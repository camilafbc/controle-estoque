import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import BadgePageTitle from "@/components/BadgePageTitle";
import CursosContainer from "./componentes/CursosContainer";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Cursos", href: "/adm/Cursos" },
        ]}
        homeHref="/adm/home"
      />
      <BadgePageTitle title="Cursos" />
      <Separator orientation="horizontal" className="mb-4" />
      <CursosContainer />
    </div>
  );
}
