import { Sun, Moon, Laptop } from "lucide-react";

import { Button } from "@/components/ui/button";

const icons = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};

export const ThemeSwitcher = ({
  setTheme,
}: {
  setTheme: (theme: string) => void;
}) => (
  <div>
    <p className="text-sm font-semibold">Modo:</p>
    {[
      { theme: "light", icon: "light", label: "Claro" },
      { theme: "dark", icon: "dark", label: "Escuro" },
      { theme: "system", icon: "system", label: "Sistema" },
    ].map((item) => {
      const Icon = icons[item.icon as keyof typeof icons];
      return (
        <Button
          key={item.theme}
          variant="ghost"
          onClick={() => setTheme(item.theme)}
          className="w-full justify-start ps-0"
        >
          <Icon className="me-0.5 h-4" />
          {item.label}
        </Button>
      );
    })}
  </div>
);
