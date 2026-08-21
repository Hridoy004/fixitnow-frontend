import { Suspense } from "react";

import EditServiceContent from "./EditServiceContent";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditServicePage({ params }: EditServicePageProps) {
  return (
    <Suspense fallback={<div className="p-6">Loading service...</div>}>
      <EditServiceContent params={params} />
    </Suspense>
  );
}
