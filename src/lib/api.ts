import { SigninInput } from "@/schemas/auth.schema";
import {
  GuideProfile,
  ProfileData,
  TouristProfile,
} from "@/schemas/onboarding.schema";
import { Guide, Tourist, User } from "@/schemas/user.schema";
import { register } from "module";
import { success } from "zod";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";

interface AuthResponse {
  user: User;
}

interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BACKEND_URL}/${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return { success: true } as T;
    }

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: data.error || data.message || "Something went wrong",
        errors: data.errors || undefined,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

export const authAPI = {
  login: async (credentials: SigninInput): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  register: async (userData: ProfileData): Promise<AuthResponse> => {
    function isTourist(userData: ProfileData): userData is TouristProfile {
      return userData.role === "tourist";
    }

    function isGuide(userData: ProfileData): userData is GuideProfile {
      return userData.role === "guide";
    }

    const backendData = {
      role: userData.role.toUpperCase(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      age: userData.age,
      username: userData.username,
      password: userData.password,
      ...(isTourist(userData) && {
        country: userData.country,
        travelPreferences: userData.travelPreferences,
      }),
      ...(isGuide(userData) && {
        languages: userData.languages,
        yearsOfExp: userData.yearsOfExp,
      }),
    };

    const response = await apiRequest<AuthResponse>("auth/register", {
      method: "POST",
      body: JSON.stringify(backendData),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await apiRequest<{ message: string }>("auth/logout", {
      method: "POST",
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    return response;
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>("auth/me");
  },

  healthCheck: async (): Promise<{
    status: string;
    timestamp: string;
    service: string;
  }> => {
    return await apiRequest("auth/health");
  },
};

export const userAPI = {
  getAll: async (): Promise<User[]> => {
    return await apiRequest("users");
  },

  getByUsername: async (username: string): Promise<User> => {
    return await apiRequest(`users?username=${username}`);
  },

  getById: async (userId: string): Promise<User> => {
    return await apiRequest(`users/${userId}`);
  },

  update: async (userId: string, userData: Partial<User>): Promise<User> => {
    return await apiRequest(`users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  delete: async (userId: string): Promise<{ success: boolean }> => {
    return await apiRequest(`users/${userId}`, {
      method: "DELETE",
    });
  },

  create: async (userData: ProfileData): Promise<User> => {
    return await apiRequest("users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};

export const auth = {
  getCurrentUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  saveSession: (user: User): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      await authAPI.getCurrentUser();
      return true;
    } catch (error) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      return false;
    }
  },

  isAdmin: (): boolean => {
    const user = auth.getCurrentUser();
    return user?.role === "admin";
  },

  isTourist: (): boolean => {
    const user = auth.getCurrentUser();
    return user?.role === "tourist";
  },

  isGuide: (): boolean => {
    const user = auth.getCurrentUser();
    return user?.role === "guide";
  },

  isProfileComplete: (): boolean => {
    const user = auth.getCurrentUser();
    return user?.isProfileComplete === true;
  },

  logout: async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
  },
};

export default apiRequest;
