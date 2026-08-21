import { getPublicCategories } from "@/app/(dashboardGroup)/_actions/categoryActions";

import ServiceForm from "../_components/ServiceForm";

export const instant = false;

export default async function CreateServicePage() {
  const categories = await getPublicCategories();

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Service</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new service that customers can book.
        </p>
      </div>

      {!categories.success ? (
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">{categories.message}</p>
        </div>
      ) : (
        <ServiceForm categories={categories.data} />
      )}
    </main>
  );
}
