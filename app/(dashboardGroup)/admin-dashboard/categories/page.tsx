import { Suspense } from "react";
import { getCategories } from "../../_actions/categoryActions";

import { CategoriesPageClient } from "./_components/CategoriesPageClient";
import { CategoryTableSkeleton } from "./_components/categoryTableSkeleton";

async function CategoriesData() {
  const result = await getCategories();

  const categories = result.success
    ? Array.isArray(result.data)
      ? result.data
      : []
    : [];

  return <CategoriesPageClient initialCategories={categories} />;
}

export default function CategoriesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage service categories used across FixItNow.
        </p>
      </div>

      <Suspense fallback={<CategoryTableSkeleton />}>
        <CategoriesData />
      </Suspense>
    </div>
  );
}
