import { Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ITechnician } from "@/lib/types";

interface ReviewSummaryProps {
  technician: ITechnician;
}

export default function ReviewSummary({ technician }: ReviewSummaryProps) {
  const reviews = technician.reviews ?? [];

  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Customer Reviews</h2>

          <p className="text-sm text-muted-foreground">
            What customers say about your service
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/technician-dashboard/reviews">View All</Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-6 py-5">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
          <Star className="size-6 fill-current text-primary" />
        </div>

        <div>
          <p className="text-2xl font-semibold">
            {technician.averageRating.toFixed(1)}
          </p>

          <p className="text-xs text-muted-foreground">
            Based on {reviews.length} reviews
          </p>
        </div>
      </div>

      <div className="divide-y divide-border px-6">
        {recentReviews.length > 0 ? (
          recentReviews.map((review) => (
            <div key={review.id} className="py-5 first:pt-5 last:pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Customer avatar */}
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium">
                    {review.customer.image ? (
                      <img
                        src={review.customer.image}
                        alt={review.customer.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      review.customer.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {review.customer.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-4 ${
                        index < review.rating
                          ? "fill-current text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {review.comment && (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {review.comment}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <Star className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">No reviews yet</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Customer reviews will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
