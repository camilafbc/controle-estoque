import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashCardProps = {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  subtitle?: string | ReactNode;
  data?: string | number | ReactNode;
  loading?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  showHeader?: boolean;
  showDataSection?: boolean;
};

export default function DashboardCard({
  className,
  title,
  description,
  subtitle,
  data,
  loading,
  children,
  icon,
  showHeader = true,
  showDataSection = true,
}: DashCardProps) {
  return (
    <Card className={cn("flex h-full flex-col shadow-md", className)}>
      {/* Header (opcional) */}
      {showHeader && (title || description) && (
        <CardHeader className="space-y-0">
          {title && (
            <div className="flex items-center justify-between">
              <CardTitle className="@[250px]/card:text-3xl text-xl font-semibold tabular-nums">
                {title}
              </CardTitle>
              {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      {/* Conteúdo principal */}
      <CardContent className="flex-1 space-y-4">
        {/* Seção superior com título e ícone */}
        {/* <div className="flex items-center justify-between gap-2">
          {typeof title === "string" ? (
            <h3 className="truncate text-xl font-bold">{title}</h3>
          ) : (
            title
          )}

          <div className="flex items-center gap-2">
            {children}
          </div>
        </div> */}

        {/* Seção de dados (opcional) */}
        {showDataSection && (
          <div className="space-y-2">
            {loading ? (
              <div className="flex h-8 w-20 animate-pulse items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700"></div>
            ) : (
              data && (
                <p className="text-xl font-extrabold lg:text-2xl">
                  {typeof data === "number"
                    ? data.toLocaleString("pt-BR")
                    : data.toString()}
                </p>
              )
            )}

            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
