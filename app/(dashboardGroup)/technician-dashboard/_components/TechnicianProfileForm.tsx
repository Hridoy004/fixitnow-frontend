"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { updateTechnicianProfile } from "@/app/(dashboardGroup)/_actions/technicianActions";
import { ITechnician } from "@/lib/types";

interface TechnicianProfileFormProps {
  technician: ITechnician;
}

export default function TechnicianProfileForm({
  technician,
}: TechnicianProfileFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [bio, setBio] = useState(technician.bio);
  const [experience, setExperience] = useState(String(technician.experience));
  const [location, setLocation] = useState(technician.location);
  const [hourlyRate, setHourlyRate] = useState(String(technician.hourlyRate));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const experienceNumber = Number(experience);
    const hourlyRateNumber = Number(hourlyRate);

    if (!bio.trim()) {
      toast.error("Bio is required.");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!Number.isFinite(experienceNumber) || experienceNumber < 0) {
      toast.error("Enter a valid experience.");
      return;
    }

    if (!Number.isFinite(hourlyRateNumber) || hourlyRateNumber <= 0) {
      toast.error("Enter a valid hourly rate.");
      return;
    }

    startTransition(async () => {
      const result = await updateTechnicianProfile({
        bio: bio.trim(),
        experience: experienceNumber,
        location: location.trim(),
        hourlyRate: hourlyRateNumber,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message ?? "Profile updated successfully.");

      router.push("/technician-dashboard");

      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-background"
    >
      <div className="border-b border-border px-6 py-5">
        <h2 className="font-semibold">Edit Technician Profile</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your professional information.
        </p>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>

          <Textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Professional Electrician"
            rows={4}
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience (years)</Label>

          <Input
            id="experience"
            type="number"
            min="0"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>

          <Input
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Dhaka"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate</Label>

          <Input
            id="hourlyRate"
            type="number"
            min="1"
            value={hourlyRate}
            onChange={(event) => setHourlyRate(event.target.value)}
            placeholder="1200"
            disabled={isPending}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => router.push("/technician-dashboard")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
