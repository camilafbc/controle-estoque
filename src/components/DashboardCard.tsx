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
  delay?: number;
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
  delay: _delay,
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
    <Card
      className={cn(
        "group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/30 hover:shadow-md",
        className,
      )}
    >
      <div>
        {showHeader && (title || description || icon) && (
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              {title && (
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {title}
                </p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground/80 line-clamp-1">
                  {description}
                </p>
              )}
            </div>
            {icon && (
              <div className="shrink-0 transition-transform group-hover:scale-105">
                {icon}
              </div>
            )}
          </div>
        )}

        {showDataSection && (
          <div className="mt-4">
            {loading ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
            ) : (
              data !== undefined && data !== null && (
                <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {typeof data === "number"
                    ? data.toLocaleString("pt-BR")
                    : String(data)}
                </p>
              )
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {children && <div className="mt-4 border-t border-border/50 pt-3">{children}</div>}
    </Card>
  );
}
