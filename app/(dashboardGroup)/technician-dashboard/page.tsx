import { Suspense } from "react";

import { getAllTechnicians } from "@/app/(dashboardGroup)/_actions/technicianActions";

import { getMe } from "@/service/getMe";
import TechnicianOverview from "./_components/TechnicianOverview";

export default function TechnicianDashboardPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Technician Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, availability and customer reviews.
        </p>
      </div>

      <Suspense fallback={<TechnicianDashboardSkeleton />}>
        <TechnicianDashboardContent />
      </Suspense>
    </main>
  );
}

async function TechnicianDashboardContent() {
  const me = await getMe();

  if (!me.success || !me.data?.profile) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-semibold">Unable to load profile</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {me.message ?? "Please login again."}
        </p>
      </div>
    );
  }

  const currentUser = me.data.profile;

  if (currentUser.role !== "TECHNICIAN") {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-semibold">Access Denied</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          You are not authorized to access this dashboard.
        </p>
      </div>
    );
  }

  const technicians = await getAllTechnicians();

  if (!technicians.success) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-semibold">Failed to load technician data</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {technicians.message}
        </p>
      </div>
    );
  }

  const technician = technicians.data.find(
    (item) => item.userId === currentUser.id,
  );

  if (!technician) {
    return (
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-semibold">Technician profile not found</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your technician profile has not been created yet.
        </p>
      </div>
    );
  }

  return <TechnicianOverview technicianId={technician.id} />;
}

function TechnicianDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted" />

        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted" />
      </div>

      <div className="h-80 animate-pulse rounded-xl border border-border bg-muted" />
    </div>
  );
}
