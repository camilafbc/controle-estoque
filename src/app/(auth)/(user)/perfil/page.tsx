import { UserCircle } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import ContainerProfile from "@/components/users/ContainerProfile";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Meu Perfil"
        description="Visualize e atualize suas credenciais e informações pessoais."
        icon={<UserCircle className="size-6" />}
        homeHref="/home"
      />
      <ContainerProfile />
    </div>
  );
}
