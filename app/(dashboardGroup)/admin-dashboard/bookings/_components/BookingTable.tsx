"use client";

import { IBooking } from "@/lib/types";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface BookingTableProps {
  bookings: IBooking[];
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  REQUESTED: "bg-amber-50 text-amber-700 ring-amber-600/20",
  CONFIRMED: "bg-blue-50 text-blue-700 ring-blue-600/20",
  ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-600/20",
  IN_PROGRESS: "bg-purple-50 text-purple-700 ring-purple-600/20",
  PAID: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  CANCELLED: "bg-red-50 text-red-700 ring-red-600/20",
};

const fallbackStatusStyle = "bg-gray-100 text-gray-700 ring-gray-500/20";

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function BookingTable({ bookings }: BookingTableProps) {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-border bg-background p-14 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <CalendarDays className="h-7 w-7 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-semibold">No bookings found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no bookings to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-250 text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Service
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Technician
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="group transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium ${getAvatarColor(
                        booking.customer.name,
                      )}`}
                    >
                      {booking.customer.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium leading-tight">
                        {booking.customer.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.customer.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium leading-tight">
                      {booking.service.title}
                    </p>

                    <span className="mt-1 inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {booking.service.category.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium leading-tight">
                      {booking.technician.user.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {booking.technician.location}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(booking.bookingDate).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold">
                  ৳{booking.totalAmount.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                      statusStyles[booking.status] ?? fallbackStatusStyle
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {booking.status.replace(/_/g, " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
