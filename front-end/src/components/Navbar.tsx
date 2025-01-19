"use client"

import Image from "next/image"
import Link from "next/link"
import { UserCard } from "./UserCard"

export default function Navbar() {
  return (
    <div className="container mx-auto flex items-center justify-between gap-2">
      <div className="flex items-end space-x-10">
        <Image
          src="/logo-branco-senac.png"
          alt="logo do senac na cor branca"
          width={80}
          height={50}
        />
        <ul className="mb-[-4px] flex gap-4 text-lg text-zinc-100">
          <li className="cursor-pointer">
            <Link href={"/home"}>Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link href={"/produtos"}>Produtos</Link>
          </li>
          <li className="cursor-pointer">
            <Link href={"/relatorios"}>Relatorios</Link>
          </li>
        </ul>
      </div>
      <div>
        <UserCard />
      </div>
    </div>
  )
}
