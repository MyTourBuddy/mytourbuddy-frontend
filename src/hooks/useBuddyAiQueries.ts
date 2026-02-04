import { apiClient, getErrorMessage } from "@/lib/api/client";
import { BuddyAiRequest, BuddyAiResponse } from "@/schemas/buddy-ai.schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const buddyAiKeys = {
  all: ["buddy-ai"] as const,
  generateGuide: () => [...buddyAiKeys.all, "generate-guide"] as const,
};

export function useGenerateGuide() {
  return useMutation({
    mutationKey: buddyAiKeys.generateGuide(),
    mutationFn: async (request: BuddyAiRequest): Promise<BuddyAiResponse> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 24000);
      try {
        const response = await apiClient<BuddyAiResponse>("buddy-ai", {
          method: "POST",
          body: JSON.stringify(request),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (
        failureCount < 3 &&
        error instanceof Error &&
        error.message.includes("timeout")
      ) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 24000),
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(`Failed to generate tour plan: ${message}`);
    },
    onSuccess: () => {
      toast.success("Tour plan generated successfully!");
    },
  });
}
