import {
  getAllTechnicians,
  getTechnicianById,
} from "@/app/(dashboardGroup)/_actions/technicianActions";
import { getMe } from "@/service/getMe";
import { Star } from "lucide-react";
import { Suspense } from "react";

export default function TechnicianReviewsPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Customer Reviews
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View all reviews and feedback from your customers.
        </p>
      </div>

      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsContent />
      </Suspense>
    </main>
  );
}

async function ReviewsContent() {
  const me = await getMe();

  if (!me.success || !me.data?.profile) {
    return (
      <ErrorMessage message={me.message ?? "Unable to load your profile."} />
    );
  }

  const currentUser = me.data.profile;

  if (currentUser.role !== "TECHNICIAN") {
    return (
      <ErrorMessage message="You are not authorized to access this page." />
    );
  }

  const technicians = await getAllTechnicians();

  if (!technicians.success) {
    return <ErrorMessage message={technicians.message} />;
  }

  const technician = technicians.data.find(
    (item) => item.userId === currentUser.id,
  );

  if (!technician) {
    return <ErrorMessage message="Technician profile not found." />;
  }

  const technicianResponse = await getTechnicianById(technician.id);

  if (!technicianResponse.success || !technicianResponse.data) {
    return (
      <ErrorMessage
        message={
          technicianResponse.message ?? "Unable to load technician reviews."
        }
      />
    );
  }

  const technicianData = technicianResponse.data;

  const reviews = technicianData.reviews ?? [];

  const totalReviews = reviews.length;

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5,
  ).length;

  const fourStarReviews = reviews.filter(
    (review) => review.rating === 4,
  ).length;

  const threeStarReviews = reviews.filter(
    (review) => review.rating === 3,
  ).length;

  const twoStarReviews = reviews.filter((review) => review.rating === 2).length;

  const oneStarReviews = reviews.filter((review) => review.rating === 1).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">Average Rating</p>

          <div className="mt-3 flex items-center gap-2">
            <Star className="size-5 fill-current" />

            <span className="text-2xl font-semibold">
              {Number(technicianData.averageRating ?? 0).toFixed(1)}
            </span>

            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">Total Reviews</p>

          <p className="mt-3 text-2xl font-semibold">{totalReviews}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">5 Star Reviews</p>

          <p className="mt-3 text-2xl font-semibold">{fiveStarReviews}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">4 Star Reviews</p>

          <p className="mt-3 text-2xl font-semibold">{fourStarReviews}</p>
        </div>
      </div>

      {totalReviews > 0 && (
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="font-semibold">Rating Overview</h2>

          <div className="mt-5 space-y-3">
            <RatingBar
              rating={5}
              count={fiveStarReviews}
              total={totalReviews}
            />

            <RatingBar
              rating={4}
              count={fourStarReviews}
              total={totalReviews}
            />

            <RatingBar
              rating={3}
              count={threeStarReviews}
              total={totalReviews}
            />

            <RatingBar rating={2} count={twoStarReviews} total={totalReviews} />

            <RatingBar rating={1} count={oneStarReviews} total={totalReviews} />
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-background">
        <div className="border-b border-border px-6 py-5">
          <h2 className="font-semibold">All Reviews</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Feedback from your customers
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Star className="mx-auto size-9 text-muted-foreground" />

            <h3 className="mt-4 font-medium">No reviews yet</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Customer reviews will appear here after completed bookings.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
                      {review.customer?.name?.charAt(0).toUpperCase() ?? "C"}
                    </div>

                    <div>
                      <p className="font-medium">
                        {review.customer?.name ?? "Customer"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: 5,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index < review.rating
                            ? "fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}

                    <span className="ml-2 text-sm font-medium">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                {review.comment && (
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RatingBar({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-12 items-center gap-1 text-sm">
        <span>{rating}</span>

        <Star className="size-3.5 fill-current" />
      </div>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <span className="w-8 text-right text-sm text-muted-foreground">
        {count}
      </span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl border border-border bg-muted"
          />
        ))}
      </div>

      <div className="h-48 animate-pulse rounded-xl border border-border bg-muted" />

      <div className="rounded-xl border border-border bg-background p-6">
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
