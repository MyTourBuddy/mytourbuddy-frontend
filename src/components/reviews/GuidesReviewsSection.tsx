"use client";

import { useReviewsByGuide } from "@/hooks/useReviewQueries";
import GuideReviewCard from "./GuideReviewCard";
import { Spinner } from "../ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import { useQueries } from "@tanstack/react-query";
import { userKeys } from "@/hooks/useUserQueries";
import { apiClient } from "@/lib/api/client";
import { Guide } from "@/schemas/user.schema";

const GuidesReviewsSection = ({ user }: { user: Guide }) => {
  const {
    data: reviews,
    isLoading: loading,
    error,
  } = useReviewsByGuide(user.id);

  const touristQueries = useQueries({
    queries: (reviews || []).map((review) => ({
      queryKey: userKeys.detail(review.touristId),
      queryFn: () => apiClient<Guide>(`users/${review.touristId}`),
      enabled: !!reviews,
    })),
  });

  const allTouristsLoaded = touristQueries.every((query) => query.isSuccess);

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

  const touristsMap = new Map(
    touristQueries.map((query, index) => [reviews[index].touristId, query.data])
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {reviews?.map((review) => (
        <GuideReviewCard
          review={review}
          tourist={touristsMap.get(review.touristId)!}
          key={review.id}
        />
      ))}
    </div>
  );
};

export default GuidesReviewsSection;
