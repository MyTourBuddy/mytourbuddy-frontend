import { apiClient, getErrorMessage, isApiError } from "@/lib/api/client";
import { SigninInput } from "@/schemas/auth.schema";
import { ProfileData } from "@/schemas/onboarding.schema";
import { User } from "@/schemas/user.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthResponse {
  user: User;
}

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
  checkUsername: (username: string) =>
    [...authKeys.all, "check-username", username] as const,
  checkEmail: (email: string) =>
    [...authKeys.all, "check-email", email] as const,
};

// get current user
export function useCurrentUser(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      try {
        const response = await apiClient<AuthResponse>("auth/me");
        return response.user;
      } catch (error: any) {
        // 401 is expected when session expired - don't throw
        if (isApiError(error) && error.status === 401) {
          // Clear stale localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
          }
          return null;
        }
        // Re-throw other errors
        throw error;
      }
    },
    enabled: enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: SigninInput) => {
      const response = await apiClient<AuthResponse>("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      return response.user;
    },
    onSuccess: (user) => {
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.setQueryData(authKeys.currentUser(), user);

      const role = user.role;
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "GUIDE" || role === "TOURIST") {
        if (user.isProfileComplete) {
          router.push("/dashboard");
        } else {
          router.push(`${user.username}`);
          toast("Please complete your profile", { icon: "📝" });
        }
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Login failed:", getErrorMessage(error));
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: ProfileData) => {
      const response = await apiClient<AuthResponse>("auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return response.user;
    },
    onSuccess: (user) => {
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.setQueryData(authKeys.currentUser(), user);

      const role = user.role;
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "GUIDE" || role === "TOURIST") {
        if (user.isProfileComplete) {
          router.push("/dashboard");
        } else {
          router.push(`${user.username}`);
          toast("Please complete your profile", { icon: "📝" });
        }
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Registration failed:", getErrorMessage(error));
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await apiClient<{ message: string }>("auth/logout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      // Clear localStorage FIRST
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }

      // Invalidate current user query to trigger re-render
      queryClient.setQueryData(authKeys.currentUser(), null);

      // Clear all other queries
      queryClient.clear();

      // Redirect to login
      router.push("/signin");
    },
    onError: (error) => {
      console.error("Logout failed:", getErrorMessage(error));

      // Clear anyway
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }

      // Invalidate current user query
      queryClient.setQueryData(authKeys.currentUser(), null);
      queryClient.clear();
      router.push("/signin");
    },
  });
}

export function useCheckUsername(username: string, enabled: boolean = false) {
  return useQuery({
    queryKey: authKeys.checkUsername(username),
    queryFn: async () => {
      const response = await apiClient<{ available: boolean; message: string }>(
        `auth/check-username?username=${encodeURIComponent(username)}`
      );
      return response;
    },
    enabled: enabled && username.length >= 3,
    staleTime: 30 * 1000,
  });
}

export function useCheckEmail(email: string, enabled: boolean = false) {
  return useQuery({
    queryKey: authKeys.checkEmail(email),
    queryFn: async () => {
      const response = await apiClient<{ available: boolean; message: string }>(
        `auth/check-email?email=${encodeURIComponent(email)}`
      );
      return response;
    },
    enabled: enabled && email.includes("@"),
    staleTime: 30 * 1000,
  });
}

export function useAuthHealthCheck() {
  return useQuery({
    queryKey: [...authKeys.all, "health"] as const,
    queryFn: async () => {
      return await apiClient<{
        status: string;
        timestamp: string;
        service: string;
      }>("auth/health");
    },
    refetchInterval: 60 * 1000,
    retry: false,
  });
}
