import { ITechnician } from "@/lib/types";
import { Briefcase, Clock, Star } from "lucide-react";

interface TechnicianStatsProps {
  technician: ITechnician;
}

export default function TechnicianStats({ technician }: TechnicianStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Rating</p>
          <Star className="size-5 text-primary" />
        </div>

        <p className="mt-3 text-2xl font-semibold">
          {technician.averageRating.toFixed(1)}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Based on {technician.reviews.length} reviews
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Experience</p>
          <Briefcase className="size-5 text-primary" />
        </div>

        <p className="mt-3 text-2xl font-semibold">{technician.experience}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Years of experience
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hourly Rate</p>
          <Clock className="size-5 text-primary" />
        </div>

        <p className="mt-3 text-2xl font-semibold">
          ৳{technician.hourlyRate.toLocaleString()}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">Per hour</p>
      </div>
    </div>
  );
}
