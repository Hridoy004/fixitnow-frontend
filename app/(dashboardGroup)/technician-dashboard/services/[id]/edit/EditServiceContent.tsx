import { notFound } from "next/navigation";

import {
  getAllTechnicians,
  getTechnicianById,
} from "@/app/(dashboardGroup)/_actions/technicianActions";

import { getPublicCategories } from "@/app/(dashboardGroup)/_actions/categoryActions";

import { getMe } from "@/service/getMe";
import ServiceForm from "../../_components/ServiceForm";

interface EditServiceContentProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServiceContent({
  params,
}: EditServiceContentProps) {
  const { id } = await params;

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
    notFound();
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

  const service = technicianResponse.data.services?.find(
    (item) => item.id === id,
  );

  if (!service) {
    notFound();
  }

  const categories = await getPublicCategories();

  if (!categories.success) {
    return (
      <main className="p-6">
        <p className="text-sm text-muted-foreground">{categories.message}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Service</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your service information.
        </p>
      </div>

      <ServiceForm service={service} categories={categories.data} />
    </main>
  );
}
