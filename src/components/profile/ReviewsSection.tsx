"use client";

import { User } from "@/schemas/user.schema";
import { useReviewsByGuide } from "@/hooks/useReviewQueries";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import ReviewCard from "../ReviewCard";
import { Spinner } from "../ui/spinner";
import { PiSmileySad } from "react-icons/pi";

const ReviewsSection = ({ user }: { user: User }) => {
  const {
    data: reviews,
    isLoading: loading,
    error,
  } = useReviewsByGuide(user.id);

  const touristQueries = useQueries({
    queries: (reviews || []).map((review) => ({
      queryKey: ["users", review.touristId],
      queryFn: () => apiClient<User>(`users/${review.touristId}`),
      enabled: !!reviews,
    })),
  });

  const allTouristsLoaded = touristQueries.every((query) => !query.isLoading);
  const hasTouristError = touristQueries.some((query) => query.error);

  if (loading || !allTouristsLoaded) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <Spinner className="size-6 md:size-4" />
          Loading reviews...
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No reviews found
        </div>
      </section>
    );
  }

  if (error || hasTouristError) {
    return (
      <section className="mx-auto max-w-5xl w-full text-destructive">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error?.message || "Failed to load tourist info"}
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {reviews.map((review, index) => {
        const tourist = touristQueries[index].data;
        if (!tourist) return null;
        return <ReviewCard key={review.id} review={review} tourist={tourist} />;
      })}
    </div>
  );
};

export default ReviewsSection;
