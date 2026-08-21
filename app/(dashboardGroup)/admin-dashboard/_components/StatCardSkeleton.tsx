export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-background p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
              <div className="h-7 w-16 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
