export const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1",

  // timeout requests in 30s
  timeout: 3000,

  headers: {
    "Content-Type": "application/json",
  },

  credentials: "include" as RequestCredentials,

  retry: {
    attempts: 3,
    delay: 1000,
    maxDelay: 30000,
  },

  features: {
    enableDevTools: process.env.NODE_ENV === "development",
    enableLogging: process.env.NODE_ENV === "development",
    enableErrorTracking: process.env.NODE_ENV === "production",
  },
} as const;

// env validation
if (typeof window !== "undefined") {
  if (!API_CONFIG.baseURL) {
    console.warn(
      "⚠️ NEXT_PUBLIC_BACKEND_URL is not set. Using default: http://localhost:8080/api/v1"
    );
  }
}
