import { Skeleton } from "@/components/ui/skeleton";

export const FormSekeleton = () => {
  return (
    <div className="">
      <Skeleton />
      <div className="flex gap-2">
        <Skeleton />
        <Skeleton />
      </div>
      <div className="flex justify-items-end gap-2">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};
