import { Banknote, Briefcase, Mail, MapPin, Pencil, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ITechnician } from "@/lib/types";

interface TechnicianProfileCardProps {
  technician: ITechnician;
}

export default function TechnicianProfileCard({
  technician,
}: TechnicianProfileCardProps) {
  const { user } = technician;

  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="font-semibold">My Profile</h2>

          <p className="text-sm text-muted-foreground">
            Your technician profile information
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/technician-dashboard/profile">
            <Pencil className="mr-2 size-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-2xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {technician.bio}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 shrink-0 text-muted-foreground" />

                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 shrink-0 text-muted-foreground" />

                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />

                <span>{technician.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="size-4 shrink-0 text-muted-foreground" />

                <span>{technician.experience} years experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Rating</p>

            <p className="mt-1 text-sm font-semibold">
              ⭐ {technician.averageRating.toFixed(1)}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <Banknote className="size-4 text-muted-foreground" />

              <p className="text-xs text-muted-foreground">Hourly Rate</p>
            </div>

            <p className="mt-1 text-sm font-semibold">
              ৳{technician.hourlyRate.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Services</p>

            <p className="mt-1 text-sm font-semibold">
              {technician.services.length} services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
