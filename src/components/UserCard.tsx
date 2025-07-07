"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { GraduationCap } from "lucide-react"
import { Button } from "./ui/button"

export function UserCard() {
  const router = useRouter()
  // const userCtx = useContext(LoggedUserContext);
  const { data: session } = useSession()

  const logout = async () => {
    // localStorage.removeItem('token');
    await signOut({ redirect: false }) // Substitua '/login' pela página para onde você deseja redirecionar
    router.push("/")
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className="h-[50px] w-[50px] cursor-pointer">
          <AvatarFallback className="bg-secondary text-zinc-100">
            CF
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="absolute right-0 translate-x-4 transform">
        <div>
          <div className="flex gap-1">
            <GraduationCap />
            <span>Estética</span>
          </div>
          <hr className="my-1" />
          <p>{session?.user?.name}</p>
          <p className="text-sm">{session?.user?.email}</p>
          <hr className="my-1" />
          <Button variant={"outline"} onClick={logout}>
            Sair
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
