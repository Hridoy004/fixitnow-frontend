import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/lib/types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    className: string;
  }
> = {
  REQUESTED: {
    label: "Requested",
    className: "border-yellow-200 bg-yellow-50 text-yellow-700",
  },

  ACCEPTED: {
    label: "Accepted",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },

  DECLINED: {
    label: "Declined",
    className: "border-red-200 bg-red-50 text-red-700",
  },

  PAID: {
    label: "Paid",
    className: "border-purple-200 bg-purple-50 text-purple-700",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className: "border-orange-200 bg-orange-50 text-orange-700",
  },

  COMPLETED: {
    label: "Completed",
    className: "border-green-200 bg-green-50 text-green-700",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "border-gray-200 bg-gray-50 text-gray-700",
  },
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
