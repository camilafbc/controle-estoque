import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface DashCardProps {
  className: string;
  title: string;
  subtitle: string;
  data: string;
  loading?: boolean;
  children: ReactNode;
}

export default function DashCard({
  className,
  title,
  subtitle,
  data,
  loading,
  children,
}: DashCardProps) {
  return (
    <Card className={cn("text-white shadow-md dark:bg-slate-900", className)}>
      <CardContent className="space-y-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          {children}
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="pulse flex h-8 w-20 items-center justify-center rounded-md bg-white/10">
              {/* <ReloadIcon className="mr-2 size-4 animate-spin" /> */}
            </div>
          ) : (
            <p className="text-4xl font-extrabold">{data}</p>
          )}
          <p className="text-xs">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
