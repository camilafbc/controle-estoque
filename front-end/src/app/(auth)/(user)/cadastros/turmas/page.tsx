import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import BadgePageTitle from "@/components/BadgePageTitle";
import TurmasContainer from "./componentes/TurmasContainer";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb listItems={[{ label: "Cadastros" }, { label: "Turmas" }]} />
      <BadgePageTitle title="Turmas" />
      <Separator orientation="horizontal" className="mb-4" />
      <TurmasContainer />
    </div>
  );
}
