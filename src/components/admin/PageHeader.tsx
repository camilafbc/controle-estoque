import { ReactNode } from "react";

import MyBreadcrumb from "@/components/MyBreadcrumb";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageHeader({
  title,
  description,
  icon,
  action,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="space-y-5">
      <MyBreadcrumb listItems={breadcrumbs} homeHref="/admin/home" />
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-orange-100 p-3.5 text-orange-600 dark:bg-orange-950 dark:text-orange-300">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}
