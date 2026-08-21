import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  getAllTechnicians,
  getTechnicianById,
} from "@/app/(dashboardGroup)/_actions/technicianActions";

import { getMe } from "@/service/getMe";
import MyServices from "./_components/MyServices";

export const instant = false;

export default async function MyServicesPage() {
  const me = await getMe();

  if (
    !me.success ||
    !me.data?.profile ||
    me.data.profile.role !== "TECHNICIAN"
  ) {
    notFound();
  }

  const technicians = await getAllTechnicians();

  if (!technicians.success) {
    return (
      <main className="p-6">
        <p className="text-sm text-muted-foreground">{technicians.message}</p>
      </main>
    );
  }

  const technician = technicians.data.find(
    (item) => item.userId === me.data.profile.id,
  );

  if (!technician) {
    notFound();
  }

  const technicianResponse = await getTechnicianById(technician.id);

  if (!technicianResponse.success || !technicianResponse.data) {
    notFound();
  }

  const services = technicianResponse.data.services ?? [];

  return (
    <main className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Services</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the services you offer to customers.
          </p>
        </div>

        <Button asChild>
          <Link href="/technician-dashboard/services/create">
            <Plus className="mr-2 size-4" />
            Add Service
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-background p-5">
        <p className="text-sm text-muted-foreground">Total Services</p>

        <p className="mt-1 text-2xl font-semibold">{services.length}</p>
      </div>

      <MyServices services={services} />
    </main>
  );
}
