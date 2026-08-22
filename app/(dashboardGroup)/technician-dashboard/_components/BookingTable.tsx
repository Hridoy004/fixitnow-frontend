"use client";

import { Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { IBooking } from "@/lib/types";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BookingDetailsDialog } from "./BookingDetailsDialog";
import { BookingFilters } from "./BookingFilters";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingTableProps {
  bookings: IBooking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  const router = useRouter();

  const [activeStatus, setActiveStatus] = useState<IBooking["status"] | "ALL">(
    "ALL",
  );

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredBookings = useMemo(() => {
    if (activeStatus === "ALL") {
      return bookings;
    }

    return bookings.filter((booking) => booking.status === activeStatus);
  }, [bookings, activeStatus]);

  const counts = useMemo(() => {
    return bookings.reduce(
      (acc, booking) => {
        acc[booking.status] = (acc[booking.status] ?? 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );
  }, [bookings]);

  if (!bookings.length) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-xl border border-border bg-background">
        <div className="text-center">
          <p className="font-medium">No bookings found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            You don&apos;t have any bookings yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BookingFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        counts={counts}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left">
                <th className="px-6 py-4 font-medium">Booking</th>

                <th className="px-6 py-4 font-medium">Customer</th>

                <th className="px-6 py-4 font-medium">Service</th>

                <th className="px-6 py-4 font-medium">Booking Date</th>

                <th className="px-6 py-4 font-medium">Amount</th>

                <th className="px-6 py-4 font-medium">Status</th>

                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium">#{booking.id.slice(0, 8)}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(booking.createdAt)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {booking.customer?.name ?? "-"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {booking.customer?.email ?? "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {booking.service?.title ?? "-"}
                      </p>

                      {booking.service?.category?.name && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {booking.service.category.name}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="whitespace-nowrap">
                      {formatDate(booking.bookingDate)}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ৳{booking.totalAmount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <BookingStatusBadge status={booking.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBooking(booking);

                            setDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!filteredBookings.length && (
        <div className="rounded-xl border border-border bg-background p-10 text-center">
          <p className="font-medium">
            No {formatStatus(activeStatus)} bookings
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            There are no bookings with this status.
          </p>
        </div>
      )}

      <BookingDetailsDialog
        booking={selectedBooking}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedBooking(null);
          }
        }}
        onUpdated={() => {
          router.refresh();
        }}
      />
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatStatus(status: IBooking["status"] | "ALL") {
  if (status === "ALL") {
    return "all";
  }

  return status.toLowerCase().replace("_", " ");
}
