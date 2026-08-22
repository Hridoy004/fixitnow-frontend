"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingStatus, IBooking } from "@/lib/types";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
  Wrench,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  cancelBooking,
  updateBookingStatus,
} from "../../_actions/bookingActions";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingDetailsDialogProps {
  booking: IBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
  onCancel?: () => void;
}

export function BookingDetailsDialog({
  booking,
  open,
  onOpenChange,
  onUpdated,
  onCancel,
}: BookingDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!booking) {
    return null;
  }

  async function handleStatusUpdate(status: BookingStatus) {
    if (!booking) return;

    try {
      setLoading(true);
      setError("");

      const result = await updateBookingStatus(booking.id, status);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message || "Booking status updated successfully");

      onUpdated?.();
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update booking status";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!booking) return;

    try {
      setLoading(true);
      setError("");

      const result = await cancelBooking(booking.id);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message || "Booking cancelled successfully");

      onUpdated?.();
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to cancel booking";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <div>
              <DialogTitle>Booking Details</DialogTitle>

              <DialogDescription className="mt-1">
                #{booking.id.slice(0, 8)}
              </DialogDescription>
            </div>

            <BookingStatusBadge status={booking.status} />
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <section className="rounded-xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-medium">Customer Information</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Name" value={booking.customer?.name ?? "-"} />

              <DetailItem
                label="Email"
                value={booking.customer?.email ?? "-"}
                icon={<Mail className="h-3.5 w-3.5" />}
              />

              <DetailItem
                label="Phone"
                value={booking.customer?.phone ?? "-"}
                icon={<Phone className="h-3.5 w-3.5" />}
              />
            </div>
          </section>

          <section className="rounded-xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-medium">Service Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Service</p>

                <p className="text-sm font-medium">
                  {booking.service?.title ?? "-"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Description
                </p>

                <p className="text-sm leading-6 text-muted-foreground">
                  {booking.service?.description ?? "-"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Service Price"
                  value={`৳${booking.service?.price?.toLocaleString() ?? "0"}`}
                />

                <DetailItem
                  label="Booking Amount"
                  value={`৳${booking.totalAmount.toLocaleString()}`}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-medium">Booking Information</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Booking Date"
                value={formatDate(booking.bookingDate)}
              />

              <DetailItem
                label="Total Amount"
                value={`৳${booking.totalAmount.toLocaleString()}`}
              />

              <DetailItem label="Status" value={formatStatus(booking.status)} />

              <DetailItem
                label="Created At"
                value={formatDate(booking.createdAt)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-medium">Technician Information</h3>
            </div>

            <DetailItem
              label="Technician"
              value={booking.technician?.user?.name ?? "-"}
            />
          </section>

          <section className="rounded-xl border border-border p-4">
            <h3 className="mb-3 font-medium">Review</h3>

            {booking.review ? (
              <p className="text-sm text-muted-foreground">
                Customer review available.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No review submitted yet.
              </p>
            )}
          </section>

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <BookingActions
            status={booking.status}
            loading={loading}
            onStatusUpdate={handleStatusUpdate}
            onCancel={onCancel ?? handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BookingActions({
  status,
  loading,
  onStatusUpdate,
  onCancel,
}: {
  status: BookingStatus;
  loading: boolean;
  onStatusUpdate: (status: BookingStatus) => void;
  onCancel: () => void;
}) {
  if (status === "REQUESTED") {
    return (
      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => onStatusUpdate("DECLINED")}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Decline
        </Button>

        <Button disabled={loading} onClick={() => onStatusUpdate("ACCEPTED")}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          Accept
        </Button>
      </div>
    );
  }

  if (status === "ACCEPTED" || status === "PAID") {
    return (
      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button variant="destructive" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          disabled={loading}
          onClick={() => onStatusUpdate("IN_PROGRESS")}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Start Work
        </Button>
      </div>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <div className="flex justify-end border-t border-border pt-4">
        <Button disabled={loading} onClick={() => onStatusUpdate("COMPLETED")}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          Mark as Completed
        </Button>
      </div>
    );
  }

  return null;
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>

      <div className="flex items-center gap-1.5 text-sm font-medium">
        {icon}
        {value}
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatStatus(status: BookingStatus) {
  return status.toLowerCase().replace("_", " ");
}
