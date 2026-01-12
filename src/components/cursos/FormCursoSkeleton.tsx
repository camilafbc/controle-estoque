import { Skeleton } from "../ui/skeleton";

export const FormCursoSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 py-8 lg:grid-cols-2">
      <div className="flex-col gap-1">
        <Skeleton className="col-span-1 p-1" />
        <Skeleton className="col-span-1 p-1" />
      </div>
      <Skeleton className="flex items-center space-x-3 space-y-0 p-1" />
    </div>
  );
};
