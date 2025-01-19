import Image from "next/image";

export default function LogoContainer() {
  return (
    <Image
      src="/logo-branco-senac.png"
      alt="logo do senac na cor branca"
      width={80}
      height={50}
    />
  );
}
