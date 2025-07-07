import { Loader2 } from "lucide-react";

export default function LoaderComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Carregando</p>
      </div>
    </div>
  );
}
