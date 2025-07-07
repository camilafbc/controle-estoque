import { motion } from "framer-motion";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashCardProps {
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
}

export default function DashCard({
  className,
  title,
  subtitle,
  data,
  loading,
  children,
  icon,
  description,
  showHeader,
  showDataSection = true,
  delay = 0,
}: DashCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: delay * 0.1, duration: 0.5, ease: "backOut" },
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300 },
      }}
      className={cn("w-full", className)}
    >
      <Card className={cn("flex h-full flex-col shadow-md", className)}>
        {/* Header (opcional) */}
        {showHeader && (title || description) && (
          <CardHeader className="pb-2">
            {description && <CardDescription>{description}</CardDescription>}
            {title && (
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {title}
              </CardTitle>
            )}
          </CardHeader>
        )}

        {/* Conteúdo principal */}
        <CardContent className="flex-1 space-y-4 py-4">
          {/* Seção superior com título e ícone */}
          <div className="flex items-center justify-between gap-2">
            {typeof title === "string" ? (
              <h3 className="truncate text-xl font-bold">{title}</h3>
            ) : (
              title
            )}

            <div className="flex items-center gap-2">
              {icon && <div className="text-muted-foreground">{icon}</div>}
              {children}
            </div>
          </div>

          {/* Seção de dados (opcional) */}
          {showDataSection && (
            <div className="space-y-2">
              {loading ? (
                <div className="flex h-8 w-20 animate-pulse items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700"></div>
              ) : (
                data && <p className="text-xl font-extrabold">{data}</p>
              )}

              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
