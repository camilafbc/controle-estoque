import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import FormUserProfile, {
  FormUserProfileFields,
  FormUserProfileRef,
} from "@/components/users/FormUserProfile";
import { User } from "@/types/User";

import Container from "./components/Container";

export default async function Page() {
  const sessionCookie = cookies().get("next-auth.session-token")?.value;

  const user: User = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
    headers: {
      Cookie: `next-auth.session-token=${sessionCookie}`,
    },
    next: {
      tags: ["update-profile"],
    },
    cache: "no-store",
  }).then((res) => res.json());

  async function updateProfile({
    nome,
    senha,
  }: {
    nome: string;
    senha: string | undefined;
  }) {
    "use server";

    await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me${user.idUser}`, {
      method: "PUT",
      body: JSON.stringify({
        nome,
        password: senha,
      }),
    });

    revalidateTag("update-profile");
  }

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/admin/home" />
      <BadgePageTitle title="Meu Perfil" />
      <Container user={user} onUpdateProfile={updateProfile} />
    </div>
  );
}
