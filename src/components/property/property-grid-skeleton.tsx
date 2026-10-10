import { Skeleton } from "@/components/ui/skeleton";

export function PropertyGridSkeleton({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading properties"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-72 rounded-xl" />
      ))}
    </div>
  );
}