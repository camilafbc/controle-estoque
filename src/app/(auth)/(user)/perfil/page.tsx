import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import ContainerProfile from "@/components/users/ContainerProfile";

export default function Page() {
  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/admin/home" />
      <BadgePageTitle title="Meu Perfil" />
      <ContainerProfile />
    </div>
  );
}
