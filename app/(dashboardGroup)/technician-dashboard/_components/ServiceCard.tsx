import { Banknote, Pencil, Tag, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IService } from "@/lib/types";
import Link from "next/link";

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-background transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Wrench className="size-5" />
        </div>

        <Button asChild variant="ghost" size="icon">
          <Link href={`/technician-dashboard/services/${service.id}/edit`}>
            <Pencil className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="px-5 pb-5">
        <h2 className="font-semibold">{service.title}</h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <Tag className="size-4 text-muted-foreground" />

          <span className="text-muted-foreground">Category:</span>

          <span className="font-medium">
            {service.category?.name ?? "Uncategorized"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Banknote className="size-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">Starting from</span>
          </div>

          <span className="font-semibold">
            ৳{service.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
