import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-7 w-64" />
      <Skeleton className="h-4 w-80" />
      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
