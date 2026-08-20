"use client";

import { getCategories } from "@/app/(dashboardGroup)/_actions/categoryActions";
import { ICategory } from "@/lib/types";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { CategoryFormDialog } from "./CategoryFormDialog";
import { CategoryTable } from "./categoryTable";

type CategoriesPageClientProps = {
  initialCategories: ICategory[];
};

export function CategoriesPageClient({
  initialCategories,
}: CategoriesPageClientProps) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [isPending, startTransition] = useTransition();

  const refreshCategories = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await getCategories();

        if (!result.success) {
          toast.error(result.message || "Failed to load categories");
          return;
        }

        const data = Array.isArray(result.data) ? result.data : [];

        setCategories(data);
      } catch (error) {
        console.error("Refresh categories error:", error);
        toast.error("Failed to refresh categories");
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CategoryFormDialog mode="create" onSuccess={refreshCategories} />
      </div>

      <CategoryTable
        categories={categories}
        isPending={isPending}
        onRefresh={refreshCategories}
      />
    </div>
  );
}
