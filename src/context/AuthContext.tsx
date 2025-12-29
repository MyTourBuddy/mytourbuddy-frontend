"use client";

import { auth, authAPI } from "@/lib/api";
import { SigninInput } from "@/schemas/auth.schema";
import { ProfileData } from "@/schemas/onboarding.schema";
import { User } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = auth.getCurrentUser();

        if (currentUser) {
          try {
            await authAPI.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error("Failed to verify user session:", error);
            auth.logout();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (userData: ProfileData): Promise<AuthResult> => {
    try {
      const response = await authAPI.register(userData);

      auth.saveSession(response.user);
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed",
        errors: error.errors,
      };
    }
  };

  const login = async (credentials: SigninInput): Promise<AuthResult> => {
    try {
      const response = await authAPI.login(credentials);

      auth.saveSession(response.user);
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    auth.saveSession(updatedUser);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isTourist: user?.role === "tourist",
    isGuide: user?.role === "guide",
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
