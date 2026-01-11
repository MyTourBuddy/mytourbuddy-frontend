import { API_CONFIG } from "@/config/api.config";

// custom errors
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// network error
export class NetworkError extends Error {
  constructor(message: string = "Network error: Unable to reach the server") {
    super(message);
    this.name = "NetworkError";
  }
}

// timeout
export class TimeoutError extends Error {
  constructor(message: string = "Request timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseURL}/${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
    credentials: API_CONFIG.credentials,
    signal: controller.signal,
  };

  try {
    if (API_CONFIG.features.enableLogging) {
      console.log(`🔵 API Request: ${options.method || "GET"} ${url}`);
    }

    const response = await fetch(url, config);

    clearTimeout(timeoutId);

    // handle 204 no content
    if (response.status === 204) {
      return { success: true } as T;
    }

    // handle 401 unauthorized
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }

    const text = await response.text();

    // handle empty response
    if (!text || text.trim() === "") {
      if (response.ok) {
        return { success: true } as T;
      } else {
        if (response.status === 403 || response.status === 404) {
          return null as T;
        }
        throw new ApiError(
          response.status,
          `Request failed with status ${response.status}`
        );
      }
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      if (response.ok) {
        if (API_CONFIG.features.enableLogging) {
          console.warn("⚠️ Response is not valid JSON, returning text as data");
        }
        return { success: true, data: text } as T;
      } else {
        throw new ApiError(
          response.status,
          text || "Invalid JSON response from server"
        );
      }
    }

    if (!response.ok) {      // For 403, try to parse error message but still return null to indicate "not allowed"
      if (response.status === 403) {
        // Log the error message for debugging
        if (API_CONFIG.features.enableLogging) {
          console.error("🚫 API Error 403:", data.error || data.message || "Forbidden");
        }
        return null as T;
      }      if (response.status === 403 || response.status === 404) {
        return null as T;
      }
      throw new ApiError(
        response.status,
        data.error || data.message || "Something went wrong",
        data.errors
      );
    }

    if (API_CONFIG.features.enableLogging) {
      console.log(`🟢 API Response: ${options.method || "GET"} ${url}`, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort/timeout
    if (error instanceof Error && error.name === "AbortError") {
      throw new TimeoutError();
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new NetworkError();
    }

    // Log errors in development (but skip expected 401s for auth checks)
    if (API_CONFIG.features.enableLogging) {
      const isExpected401 =
        error instanceof ApiError &&
        error.status === 401 &&
        endpoint === "auth/me";

      if (!isExpected401) {
        console.error(`🔴 API Error: ${options.method || "GET"} ${url}`, error);
      }
    }

    // Re-throw ApiError or other errors
    throw error;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof NetworkError) {
    return "Unable to connect to the server. Please check your internet connection.";
  }
  if (error instanceof TimeoutError) {
    return "Request timed out. Please try again.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
