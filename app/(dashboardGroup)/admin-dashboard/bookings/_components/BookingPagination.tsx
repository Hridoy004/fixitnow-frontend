"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type BookingPaginationProps = {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
};

export function BookingPagination({
  page,
  total,
  limit,
  totalPages,
}: BookingPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const start = total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(nextPage));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}-{end}
        </span>{" "}
        of <span className="font-medium text-foreground">{total}</span> bookings
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeft />
          Previous
        </Button>

        <div className="hidden items-center gap-1 sm:flex">
          <span className="text-sm text-muted-foreground">Page</span>

          <span className="text-sm font-medium">{page}</span>

          <span className="text-sm text-muted-foreground">of</span>

          <span className="text-sm font-medium">{totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
