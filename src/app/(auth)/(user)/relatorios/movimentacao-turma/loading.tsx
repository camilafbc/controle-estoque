import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Skeleton do PageHeader */}
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
      </div>

      {/* Skeleton do Card de Filtro */}
      <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="flex justify-end">
          <Skeleton className="h-11 w-52 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
