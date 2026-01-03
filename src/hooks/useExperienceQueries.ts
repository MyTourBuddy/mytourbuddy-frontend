import { apiClient, getErrorMessage } from "@/lib/api/client";
import { Experience } from "@/schemas/experience.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const experienceKeys = {
  all: ["experiences"] as const,
  lists: () => [...experienceKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...experienceKeys.lists(), { filters }] as const,
  details: () => [...experienceKeys.all, "detail"] as const,
  detail: (id: string) => [...experienceKeys.details(), id] as const,
  byGuide: (guideId: string) =>
    [...experienceKeys.all, "guide", guideId] as const,
};

// get all exps
export function useExperiences() {
  return useQuery({
    queryKey: experienceKeys.lists(),
    queryFn: async () => {
      return await apiClient<Experience[]>("experiences");
    },
  });
}

// get exp by id
export function useExperience(experienceId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: experienceKeys.detail(experienceId),
    queryFn: async () => {
      return await apiClient<Experience>(`experiences/${experienceId}`);
    },
    enabled: enabled && !!experienceId,
  });
}

// get exps by guide id
export function useExperiencesByGuide(guideId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: experienceKeys.byGuide(guideId),
    queryFn: async () => {
      return await apiClient<Experience[]>(`experiences/guides/${guideId}`);
    },
    enabled: enabled && !!guideId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

// create exp
export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      experienceData: Omit<Experience, "id" | "createdAt">
    ) => {
      return await apiClient<Experience>("experiences", {
        method: "POST",
        body: JSON.stringify(experienceData),
      });
    },
    onSuccess: async (newExperience) => {
      await queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: experienceKeys.byGuide(newExperience.guideId),
      });
    },
    onError: (error) => {
      console.error("Create experience failed:", getErrorMessage(error));
    },
  });
}

// update exp
export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      experienceId,
      experienceData,
    }: {
      experienceId: string;
      experienceData: Partial<Experience>;
    }) => {
      return await apiClient<Experience>(`experiences/${experienceId}`, {
        method: "PUT",
        body: JSON.stringify(experienceData),
      });
    },
    onSuccess: async (updatedExperience, variables) => {
      queryClient.setQueryData(
        experienceKeys.detail(variables.experienceId),
        updatedExperience
      );

      await queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: experienceKeys.byGuide(updatedExperience.guideId),
      });
    },
    onError: (error) => {
      console.error("Update experience failed:", getErrorMessage(error));
    },
  });
}

// delete exp
export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (experienceId: string) => {
      return await apiClient<void>(`experiences/${experienceId}`, {
        method: "DELETE",
      });
    },
    onSuccess: async (_, experienceId) => {
      queryClient.removeQueries({ queryKey: experienceKeys.detail(experienceId) });

      await queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: experienceKeys.all });
    },
    onError: (error) => {
      console.error("Delete experience failed:", getErrorMessage(error));
    },
  });
}
