import { ITechnician } from "@/lib/types";
import AvailabilityToggle from "./AvailabilityToggle";

interface AvailabilityCardProps {
  technician: ITechnician;
}

export default function AvailabilityCard({
  technician,
}: AvailabilityCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <h2 className="font-semibold">Availability</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Control whether customers can book your services.
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            {technician.isAvailable ? "Available" : "Unavailable"}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {technician.isAvailable
              ? "Customers can book your services."
              : "Customers cannot book your services."}
          </p>
        </div>

        <AvailabilityToggle initialValue={technician.isAvailable} />
      </div>
    </div>
  );
}
