"use client";

import { IService } from "@/lib/types";
import { useRouter } from "next/navigation";
import ServiceCard from "./ServiceCard";

interface MyServicesProps {
  services: IService[];
}

export default function MyServices({ services }: MyServicesProps) {
  const router = useRouter();

  if (!services.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background p-10 text-center">
        <h3 className="font-semibold">No services yet</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first service for customers.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onDeleted={() => router.refresh()}
        />
      ))}
    </div>
  );
}
