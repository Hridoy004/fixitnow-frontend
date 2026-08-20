export function CategoryTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex gap-2">
              <div className="h-9 w-16 animate-pulse rounded bg-muted" />
              <div className="h-9 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
