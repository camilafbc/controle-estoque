import { ReactNode } from "react";

import MyBreadcrumb from "@/components/MyBreadcrumb";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  badge?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  homeHref?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  action,
  badge,
  breadcrumbs,
  homeHref,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <MyBreadcrumb listItems={breadcrumbs} homeHref={homeHref} />
      )}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400">
              {icon}
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h1>
              {badge}
            </div>
            {description && (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
