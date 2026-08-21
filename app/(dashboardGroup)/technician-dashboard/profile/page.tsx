import { Suspense } from "react";

import { getAllTechnicians } from "@/app/(dashboardGroup)/_actions/technicianActions";

import { getMe } from "@/service/getMe";
import TechnicianProfileForm from "../_components/TechnicianProfileForm";

export default function TechnicianProfilePage() {
  return (
    <main className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your technician profile information.
        </p>
      </div>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}

async function ProfileContent() {
  const me = await getMe();

  if (!me.success || !me.data?.profile) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          {me.message ?? "Unable to load your profile."}
        </p>
      </div>
    );
  }

  const currentUser = me.data.profile;

  if (currentUser.role !== "TECHNICIAN") {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          You are not authorized to access this page.
        </p>
      </div>
    );
  }

  const technicians = await getAllTechnicians();

  if (!technicians.success) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">{technicians.message}</p>
      </div>
    );
  }

  const technician = technicians.data.find(
    (item) => item.userId === currentUser.id,
  );

  if (!technician) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Technician profile not found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <TechnicianProfileForm technician={technician} />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="h-125 animate-pulse rounded-xl border border-border bg-muted" />
    </div>
  );
}
