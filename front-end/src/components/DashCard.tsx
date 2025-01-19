import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashCardProps {
  className: string;
  title: string;
  subtitle: string;
  data: string;
  children: ReactNode;
}

export default function DashCard({
  className,
  title,
  subtitle,
  data,
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
          <p className="text-4xl font-extrabold">{data || 0}</p>
          <p className="text-xs">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
