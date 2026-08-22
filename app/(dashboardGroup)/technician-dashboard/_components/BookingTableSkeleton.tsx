import { Skeleton } from "@/components/ui/skeleton";

export function BookingTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              {[
                "Booking",
                "Customer",
                "Service",
                "Date",
                "Amount",
                "Status",
                "Action",
              ].map((item) => (
                <th
                  key={item}
                  className="px-6 py-4 text-left text-sm font-medium"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-5">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </td>

                <td className="px-6 py-5">
                  <Skeleton className="h-4 w-24" />
                </td>

                <td className="px-6 py-5">
                  <Skeleton className="h-4 w-32" />
                </td>

                <td className="px-6 py-5">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="px-6 py-5">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
