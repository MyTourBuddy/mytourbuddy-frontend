"use client";

import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
} from "@/hooks/useAuthQueries";
import { getErrorMessage, isApiError } from "@/lib/api/client";
import { SigninInput } from "@/schemas/auth.schema";
import { ProfileData } from "@/schemas/onboarding.schema";
import { User, userSchema } from "@/schemas/user.schema";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  errors?: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTourist: boolean;
  isGuide: boolean;
  register: (userData: ProfileData) => Promise<AuthResult>;
  login: (credentials: SigninInput) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [shouldCheckAuth, setShouldCheckAuth] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      setShouldCheckAuth(!!stored);
    }
  }, []);

  // Use the reactive state
  const { data: currentUser, isLoading } = useCurrentUser(shouldCheckAuth);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Sync user from query cache or localStorage
  useEffect(() => {
    if (currentUser) {
      // User from cache (after successful auth)
      setUser(currentUser);
      setShouldCheckAuth(true);
    } else if (shouldCheckAuth && !isLoading && !currentUser) {
      // Query ran but returned no user - clear everything
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } else if (typeof window !== "undefined" && !shouldCheckAuth) {
      // Initial load - check localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const result = userSchema.safeParse(parsed);
          if (result.success) {
            setUser(result.data);
            setShouldCheckAuth(true);
          } else {
            console.warn("Invalid user data in localStorage, clearing.");
            localStorage.removeItem("user");
            setUser(null);
          }
        } catch {
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    }
  }, [currentUser, shouldCheckAuth, isLoading]);

  const register = async (userData: ProfileData): Promise<AuthResult> => {
    try {
      const user = await registerMutation.mutateAsync(userData);
      setUser(user);
      return { success: true, user };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
        errors: isApiError(error) ? error.errors : undefined,
      };
    }
  };

  const login = async (credentials: SigninInput): Promise<AuthResult> => {
    try {
      const user = await loginMutation.mutateAsync(credentials);
      setUser(user);
      return { success: true, user };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setShouldCheckAuth(false); // ← Disable query after logout!
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    loading: isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isTourist: user?.role === "TOURIST",
    isGuide: user?.role === "GUIDE",
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
