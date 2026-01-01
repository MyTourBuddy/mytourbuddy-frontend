import { apiClient, getErrorMessage, isApiError } from "@/lib/api/client";
import { User } from "@/schemas/user.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "./useAuthQueries";
import { ProfileData } from "@/schemas/onboarding.schema";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  byUsername: (username: string) =>
    [...userKeys.all, "username", username] as const,
};

// get all users
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      return await apiClient<User[]>("users");
    },
  });
}

// get user by id
export function useUser(userId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: async () => {
      return await apiClient<User>(`users/${userId}`);
    },
    enabled: enabled && !!userId,
  });
}

// get user by username
export function useUserByUsername(username: string, enabled: boolean = true) {
  return useQuery({
    queryKey: userKeys.byUsername(username),
    queryFn: async () => {
      return await apiClient<User>(`users?username=${username}`);
    },
    enabled: enabled && !!username,
    retry: false,
  });
}

// update user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: Partial<User>;
    }) => {
      return await apiClient<User>(`users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });
    },
    onSuccess: (updatedUser, variables) => {
      // Update user detail cache
      queryClient.setQueryData(userKeys.detail(variables.userId), updatedUser);

      // Update current user cache if updating self
      const currentUser = queryClient.getQueryData<User>(
        authKeys.currentUser()
      );
      if (currentUser && currentUser.id === variables.userId) {
        queryClient.setQueryData(authKeys.currentUser(), updatedUser);

        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }

      // Invalidate username cache if username changed
      if (updatedUser.username) {
        queryClient.invalidateQueries({
          queryKey: userKeys.byUsername(updatedUser.username),
        });
      }

      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      console.error("Update user failed:", getErrorMessage(error));
    },
  });
}

// delete user - admin only
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await apiClient<{ success: boolean }>(`users/${userId}`, {
        method: "DELETE",
      });
    },
    onSuccess: (_, userId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });

      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      console.error("Delete user failed:", getErrorMessage(error));
    },
  });
}

// create user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: ProfileData) => {
      return await apiClient<User>("users", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },
    onSuccess: (newUser) => {
      // Add to cache
      queryClient.setQueryData(userKeys.detail(newUser.id), newUser);

      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      console.error("Create user failed:", getErrorMessage(error));
    },
  });
}

// upload avatar to imgbb
export function useUploadAvatar() {
  return useMutation({
    mutationFn: async (base64: string) => {
      const response = await fetch(base64);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob);

      const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!IMGBB_KEY) {
        throw new Error("IMGBB API key not configured");
      }

      const uploadResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await uploadResponse.json();
      if (!result.success) {
        throw new Error("Failed to upload image");
      }

      console.log(result);

      return result.data.url;
    },
  });
}
