import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getAllBookings } from "../_actions/bookingActions";
import { BookingTable } from "../admin-dashboard/bookings/_components/BookingTable";

export async function RecentBookings() {
  const { success, message, data } = await getAllBookings(1, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          Recent Bookings
        </h2>

        <Link
          href="/admin-dashboard/bookings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {!success ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
          {message}
        </div>
      ) : (
        <BookingTable bookings={data} />
      )}
    </div>
  );
}
