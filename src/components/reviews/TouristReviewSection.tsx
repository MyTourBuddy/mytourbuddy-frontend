"use client";

import { Tourist, Guide } from "@/schemas/user.schema";
import TouristReviewCard from "./TouristReviewCard";
import { useReviewsByTourist } from "@/hooks/useReviewQueries";
import { Spinner } from "../ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import { useQueries } from "@tanstack/react-query";
import { userKeys } from "@/hooks/useUserQueries";
import { apiClient } from "@/lib/api/client";

const TouristReviewSection = ({ user }: { user: Tourist }) => {
  const {
    data: reviews,
    isLoading: loading,
    error,
  } = useReviewsByTourist(user.id);

  const guideQueries = useQueries({
    queries: (reviews || []).map((review) => ({
      queryKey: userKeys.detail(review.guideId),
      queryFn: () => apiClient<Guide>(`users/${review.guideId}`),
      enabled: !!reviews,
    })),
  });

  const allGuidesLoaded = guideQueries.every((query) => query.isSuccess);

  if (loading || !allGuidesLoaded) {
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

  if (error) {
    return (
      <section className="mx-auto max-w-5xl w-full text-destructive">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error?.message}
        </div>
      </section>
    );
  }

  const guidesMap = new Map(
    guideQueries.map((query, index) => [reviews[index].guideId, query.data])
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {reviews?.map((review) => (
        <TouristReviewCard
          review={review}
          guide={guidesMap.get(review.guideId)!}
          key={review.id}
        />
      ))}
    </div>
  );
};

export default TouristReviewSection;
