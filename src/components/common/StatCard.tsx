import { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  loading?: boolean;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

export function StatCard({
  title,
  value,
  description,
  icon,
  loading = false,
  trend,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-500/30">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          {loading ? (
            <Skeleton className="h-8 w-24 my-1" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-foreground">
                {value}
              </span>
              {trend && (
                <span
                  className={`text-xs font-semibold ${
                    trend.positive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {trend.value}
                </span>
              )}
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-foreground transition-colors group-hover:scale-105">
          {icon}
        </div>
      </div>
    </div>
  );
}
