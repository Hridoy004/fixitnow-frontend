import { Suspense } from "react";

import { getAllBookings } from "../../_actions/bookingActions";
import { BookingTable } from "../_components/BookingTable";
import { BookingTableSkeleton } from "../_components/BookingTableSkeleton";

async function BookingList() {
  const result = await getAllBookings(1, 10);

  if (!result.success) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <h3 className="font-medium text-destructive">
          Failed to load bookings
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  return <BookingTable bookings={result.data} />;
}

export default function BookingsPage() {
  return (
    <main className="space-y-5 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your customer service bookings and requests.
        </p>
      </div>

      <Suspense fallback={<BookingTableSkeleton />}>
        <BookingList />
      </Suspense>
    </main>
  );
}
