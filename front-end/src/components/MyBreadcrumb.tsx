"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface MyBreadcrumbProps {
  listItems?: Array<BreadcrumbItem>;
  homeHref?: string;
}

export default function MyBreadcrumb({
  listItems,
  homeHref,
}: MyBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <li>
          <Link
            href={homeHref ? homeHref : "/home"}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-500/90"
          >
            Home
          </Link>
        </li>
        {listItems?.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-orange-500 hover:text-orange-500/90"
                >
                  {item.label}
                </Link>
              ) : (
                <BreadcrumbPage className="text-muted-foreground">
                  {item.label}
                </BreadcrumbPage>
              )}
            </li>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
