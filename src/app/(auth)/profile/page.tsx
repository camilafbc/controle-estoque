import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import FormUsuario from "./componentes/FormUsuario";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      {/* <MyBreadcrumb listItems={[{ label: "Perfil", href: "/profile" }]} /> */}
      <h2 className="mt-8 text-lg font-bold md:text-2xl">Meu Perfil</h2>
      <Separator orientation="horizontal" className="mb-8" />

      <Card>
        <CardContent className="p-8">
          <FormUsuario />
        </CardContent>
      </Card>
    </div>
  );
}
