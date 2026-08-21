"use client";

import { CheckCircle2, Loader2, Power } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateTechnicianAvailability } from "@/app/(dashboardGroup)/_actions/technicianActions";
import { Switch } from "@/components/ui/switch";

interface AvailabilityToggleProps {
  initialValue: boolean;
}

export default function AvailabilityToggle({
  initialValue,
}: AvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: boolean) => {
    const previousValue = isAvailable;

    setIsAvailable(value);

    startTransition(async () => {
      const result = await updateTechnicianAvailability(value);

      if (!result.success) {
        setIsAvailable(previousValue);

        toast.error(result.message);

        return;
      }

      toast.success(
        value
          ? "You are now available for bookings."
          : "You are now unavailable for bookings.",
      );
    });
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Availability</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Control whether customers can book your services.
          </p>
        </div>

        <Power
          className={`size-5 ${
            isAvailable ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-9 items-center justify-center rounded-full ${
              isAvailable ? "bg-primary/10" : "bg-muted"
            }`}
          >
            {isAvailable ? (
              <CheckCircle2 className="size-5 text-primary" />
            ) : (
              <Power className="size-5 text-muted-foreground" />
            )}
          </div>

          <div>
            <p className="text-sm font-medium">
              {isAvailable ? "Available" : "Unavailable"}
            </p>

            <p className="text-xs text-muted-foreground">
              {isAvailable
                ? "Customers can book your services."
                : "Customers cannot book your services."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPending && (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          )}

          <Switch
            checked={isAvailable}
            onCheckedChange={handleChange}
            disabled={isPending}
            aria-label="Toggle technician availability"
          />
        </div>
      </div>
    </div>
  );
}
