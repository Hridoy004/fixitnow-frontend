"use client";

import { Pencil, Trash2, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteService } from "@/app/(dashboardGroup)/_actions/serviceActions";

import { IService } from "@/lib/types";

interface ServiceCardProps {
  service: IService;
  onDeleted?: () => void;
}

export default function ServiceCard({ service, onDeleted }: ServiceCardProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const result = await deleteService(service.id);

      if (!result.success) {
        toast.error(result.message ?? "Failed to delete service.");
        return;
      }

      toast.success(result.message ?? "Service deleted successfully.");

      setOpen(false);
      onDeleted?.();
    } catch (error) {
      console.error("Delete service error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-background p-5 transition hover:shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="size-5" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold">{service.title}</h3>

              <p className="text-sm text-muted-foreground">
                {service.category?.name}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">৳{service.price.toLocaleString()}</p>

            <p className="text-xs text-muted-foreground">per service</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-5 flex justify-end gap-2 border-t border-border pt-4">
          <Button asChild variant="outline" size="sm" disabled={loading}>
            <Link href={`/technician-dashboard/services/${service.id}/edit`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {service.title}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? "Deleting..." : "Delete Service"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
