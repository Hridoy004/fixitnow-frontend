import { getTechnicianById } from "@/app/(dashboardGroup)/_actions/technicianActions";

import AvailabilityToggle from "./AvailabilityToggle";
import ReviewSummary from "./ReviewSummary";
import TechnicianProfileCard from "./TechnicianProfileCard";

interface TechnicianOverviewProps {
  technicianId: string;
}

export default async function TechnicianOverview({
  technicianId,
}: TechnicianOverviewProps) {
  const result = await getTechnicianById(technicianId);

  if (!result.success || !result.data) {
    return (
      <div className="rounded-xl border border-border p-6">
        <p className="text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const technician = result.data;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <TechnicianProfileCard technician={technician} />

        <AvailabilityToggle initialValue={technician.isAvailable} />
      </div>

      <ReviewSummary technician={technician} />
    </div>
  );
}
