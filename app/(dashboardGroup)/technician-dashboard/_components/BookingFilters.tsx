"use client";

import { BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookingFiltersProps {
  activeStatus: BookingStatus | "ALL";
  onStatusChange: (status: BookingStatus | "ALL") => void;
  counts?: Record<string, number>;
}

const filters: {
  label: string;
  value: BookingStatus | "ALL";
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Requested",
    value: "REQUESTED",
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
  },
  {
    label: "Paid",
    value: "PAID",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Declined",
    value: "DECLINED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export function BookingFilters({
  activeStatus,
  onStatusChange,
  counts,
}: BookingFiltersProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-center gap-1 rounded-lg border border-border bg-background p-1">
        {filters.map((filter) => {
          const isActive = activeStatus === filter.value;

          const count =
            filter.value === "ALL" ? undefined : (counts?.[filter.value] ?? 0);

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onStatusChange(filter.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-muted",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {filter.label}

              {filter.value !== "ALL" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs",
                    isActive
                      ? "bg-primary-foreground/20"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
