"use client";

import {
  createCategory,
  updateCategory,
} from "@/app/(dashboardGroup)/_actions/categoryActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICategory } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type CategoryFormDialogProps = {
  mode: "create" | "edit";
  category?: ICategory;
  onSuccess?: () => void;
};

export function CategoryFormDialog({
  mode,
  category,
  onSuccess,
}: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result =
          mode === "edit" && category
            ? await updateCategory(category.id, null, formData)
            : await createCategory(null, formData);

        if (result?.success) {
          toast.success(
            result.message ||
              (mode === "edit"
                ? "Category updated successfully"
                : "Category created successfully"),
          );

          setOpen(false);
          onSuccess?.();
        } else {
          toast.error(result?.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!pending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm">
            <PencilIcon data-icon="inline-start" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>

            <Input
              id="category-name"
              name="name"
              type="text"
              placeholder="e.g. Plumbing"
              defaultValue={category?.name ?? ""}
              required
              disabled={pending}
              autoComplete="off"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
