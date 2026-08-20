import { Suspense } from "react";

import { getAllBookings } from "../../_actions/bookingActions";
import { BookingPagination } from "./_components/BookingPagination";
import { BookingTable } from "./_components/BookingTable";
import { BookingTableSkeleton } from "./_components/BookingTableSkeleton";

type BookingsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

async function BookingContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  const { success, message, data, meta } = await getAllBookings(page, 10);

  if (!success) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
        {message}
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <BookingTable bookings={data} />

      {data.length > 0 && (
        <BookingPagination
          page={meta.page}
          total={meta.total}
          limit={meta.limit}
          totalPages={meta.totalPages}
        />
      )}
    </div>
  );
}

export default function BookingsPage({ searchParams }: BookingsPageProps) {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>

        <p className="text-sm text-muted-foreground">
          Manage and monitor all customer bookings.
        </p>
      </div>

      <Suspense fallback={<BookingTableSkeleton />}>
        <BookingContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
