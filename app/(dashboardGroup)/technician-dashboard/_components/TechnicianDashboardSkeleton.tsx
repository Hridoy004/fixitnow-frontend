export default function TechnicianDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted" />

        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted" />
      </div>

      <div className="h-80 animate-pulse rounded-xl border border-border bg-muted" />
    </div>
  );
}
