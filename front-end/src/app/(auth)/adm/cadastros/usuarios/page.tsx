import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import BadgePageTitle from "@/components/BadgePageTitle";
import UsersContainer from "./componentes/UsersContainer";

export default function Page() {
  return (
    <>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Usuários", href: "/adm/cadastros/usuarios" },
        ]}
        homeHref="/adm/home"
      />
      <BadgePageTitle title="Usuários" />
      <Separator orientation="horizontal" className="mb-4" />
      <UsersContainer />
    </>
  );
}
