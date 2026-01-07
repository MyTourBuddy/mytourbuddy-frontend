import { apiClient, getErrorMessage } from "@/lib/api/client";
import { Package } from "@/schemas/package.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const packageKeys = {
  all: ["packages"] as const,
  lists: () => [...packageKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...packageKeys.lists(), { filters }] as const,
  details: () => [...packageKeys.all, "detail"] as const,
  detail: (id: string) => [...packageKeys.details(), id] as const,
  byGuide: (guideId: string) => [...packageKeys.all, "guide", guideId] as const,
  search: (title: string) => [...packageKeys.all, "search", title] as const,
};

// get all packages
export function usePackages() {
  return useQuery({
    queryKey: packageKeys.lists(),
    queryFn: async () => {
      return await apiClient<Package[]>("packages");
    },
  });
}

// get package by id
export function usePackage(packageId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: packageKeys.detail(packageId),
    queryFn: async () => {
      return await apiClient<Package>(`packages/${packageId}`);
    },
    enabled: enabled && !!packageId,
  });
}

// get packages by guide id
export function usePackagesByGuide(guideId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: packageKeys.byGuide(guideId),
    queryFn: async () => {
      return await apiClient<Package[]>(`packages/guides/${guideId}`);
    },
    enabled: enabled && !!guideId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

// search packages by title or location
export function useSearchPackages(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: packageKeys.search(query),
    queryFn: async () => {
      return await apiClient<Package[]>(`packages/search?q=${encodeURIComponent(query)}`);
    },
    enabled: enabled && !!query && query.length >= 3,
  });
}

// create package
export function useCreatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageData: Omit<Package, "id" | "createdAt">) => {
      return await apiClient<Package>("packages", {
        method: "POST",
        body: JSON.stringify(packageData),
      });
    },
    onSuccess: async (newPackage) => {
      await queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: packageKeys.byGuide(newPackage.guideId),
      });
    },
    onError: (error) => {
      console.error("Create package failed:", getErrorMessage(error));
    },
  });
}

// update package
export function useUpdatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      packageId,
      packageData,
    }: {
      packageId: string;
      packageData: Partial<Package>;
    }) => {
      return await apiClient<Package>(`packages/${packageId}`, {
        method: "PUT",
        body: JSON.stringify(packageData),
      });
    },
    onSuccess: async (updatedPackage, variables) => {
      queryClient.setQueryData(
        packageKeys.detail(variables.packageId),
        updatedPackage
      );

      await queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: packageKeys.byGuide(updatedPackage.guideId),
      });
    },
    onError: (error) => {
      console.error("Update package failed:", getErrorMessage(error));
    },
  });
}

// delete package
export function useDeletePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      return await apiClient<void>(`packages/${packageId}`, {
        method: "DELETE",
      });
    },
    onSuccess: async (_, packageId) => {
      queryClient.removeQueries({ queryKey: packageKeys.detail(packageId) });

      await queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: packageKeys.all });
    },
    onError: (error) => {
      console.error("Delete package failed:", getErrorMessage(error));
    },
  });
}
