import { Suspense } from "react";
import { RecentBookings } from "./_components/RecentBookings";
import { StatsGridSkeleton } from "./_components/StatCardSkeleton";
import { StatsGrid } from "./_components/StatsGrid";
import { BookingTableSkeleton } from "./bookings/_components/BookingTableSkeleton";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Overview of your platform&apos;s activity.
        </p>
      </div>

      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsGrid />
      </Suspense>

      <Suspense fallback={<BookingTableSkeleton />}>
        <RecentBookings />
      </Suspense>
    </div>
  );
}
