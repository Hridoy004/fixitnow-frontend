export function BookingTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <div className="min-w-250">
          <div className="grid grid-cols-7 gap-4 border-b border-border bg-muted/40 px-6 py-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse rounded bg-muted" />
            ))}
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-7 items-center gap-4 px-6 py-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />

                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                </div>

                <div className="h-4 w-20 animate-pulse rounded bg-muted" />

                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

                <div className="ml-auto h-8 w-16 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
