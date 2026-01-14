import { apiClient, getErrorMessage } from "@/lib/api/client";
import { Review } from "@/schemas/review.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingKeys } from "./useBookingQueries";

export const reviewKeys = {
  all: ["reviews"] as const,
  lists: () => [...reviewKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...reviewKeys.lists(), { filters }] as const,
  details: () => [...reviewKeys.all, "detail"] as const,
  detail: (id: string) => [...reviewKeys.details(), id] as const,
  byGuide: (guideId: string) =>
    [...reviewKeys.all, "guide", guideId] as const,
  byTourist: (touristId: string) =>
    [...reviewKeys.all, "tourist", touristId] as const,
};

// get all reviews
export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.lists(),
    queryFn: async () => {
      return await apiClient<Review[]>("reviews");
    },
  });
}

// get review by id
export function useReview(reviewId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: async () => {
      return await apiClient<Review>(`reviews/${reviewId}`);
    },
    enabled: enabled && !!reviewId,
  });
}

// get reviews by guide id
export function useReviewsByGuide(guideId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: reviewKeys.byGuide(guideId),
    queryFn: async () => {
      return await apiClient<Review[]>(`reviews/guides/${guideId}`);
    },
    enabled: enabled && !!guideId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

// get reviews by tourist id
export function useReviewsByTourist(touristId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: reviewKeys.byTourist(touristId),
    queryFn: async () => {
      return await apiClient<Review[]>(`reviews/tourists/${touristId}`);
    },
    enabled: enabled && !!touristId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

// create review
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      reviewData: Omit<Review, "id" | "createdAt">
    ) => {
      return await apiClient<Review>("reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
      });
    },
    onSuccess: async (newReview, reviewData) => {
      await queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: bookingKeys.my() });
      if (newReview && newReview.guideId && newReview.touristId) {
        await queryClient.invalidateQueries({
          queryKey: reviewKeys.byGuide(newReview.guideId),
        });
        await queryClient.invalidateQueries({
          queryKey: reviewKeys.byTourist(newReview.touristId),
        });
      } else if (reviewData.guideId && reviewData.touristId) {
        // Fallback: use the data we sent if the response doesn't include it
        await queryClient.invalidateQueries({
          queryKey: reviewKeys.byGuide(reviewData.guideId),
        });
        await queryClient.invalidateQueries({
          queryKey: reviewKeys.byTourist(reviewData.touristId),
        });
      }
    },
    onError: (error) => {
      console.error("Create review failed:", getErrorMessage(error));
    },
  });
}

// update review
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      reviewData,
    }: {
      reviewId: string;
      reviewData: Partial<Review>;
    }) => {
      return await apiClient<Review>(`reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(reviewData),
      });
    },
    onSuccess: async (updatedReview, variables) => {
      queryClient.setQueryData(
        reviewKeys.detail(variables.reviewId),
        updatedReview
      );

      await queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: reviewKeys.byGuide(updatedReview.guideId),
      });
      await queryClient.invalidateQueries({
        queryKey: reviewKeys.byTourist(updatedReview.touristId),
      });
    },
    onError: (error) => {
      console.error("Update review failed:", getErrorMessage(error));
    },
  });
}

// delete review
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      return await apiClient<void>(`reviews/${reviewId}`, {
        method: "DELETE",
      });
    },
    onSuccess: async (_, reviewId) => {
      queryClient.removeQueries({ queryKey: reviewKeys.detail(reviewId) });

      await queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onError: (error) => {
      console.error("Delete review failed:", getErrorMessage(error));
    },
  });
}

