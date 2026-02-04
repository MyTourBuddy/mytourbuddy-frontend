import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";

const ROUTE_CONFIG = {
  protected: ["/dashboard", "/admin"],
  public: ["/signin", "/signup", "/"],
  adminOnly: ["/admin"],
  guideProfileRequired: ["/dashboard/packages", "/dashboard/experiences"],
  allowedIncomplete: [
    "/dashboard",
    "/dashboard/settings",
    "/dashboard/support",
  ],
} as const;

interface UserResponse {
  user: {
    id: string;
    username: string;
    role: "ADMIN" | "GUIDE" | "TOURIST";
    isProfileComplete: boolean;
  } | null;
}

async function validateToken(token: string): Promise<UserResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (response.status === 401) {
      // Token invalid/expired
      return null;
    }

    if (response.status === 403) {
      // Token valid but insufficient permissions
      return null;
    }

    if (!response.ok) {
      // Other server errors
      console.error(
        `Token validation failed: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Token validation network error:", error);
    return null;
  }
}

const isRouteProtected = (pathname: string): boolean =>
  ROUTE_CONFIG.protected.some((route) => pathname.startsWith(route));

const isRoutePublic = (pathname: string): boolean =>
  ROUTE_CONFIG.public.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

const isAdminRoute = (pathname: string): boolean =>
  ROUTE_CONFIG.adminOnly.some((route) => pathname.startsWith(route));

const isGuideProfileRequired = (pathname: string): boolean =>
  ROUTE_CONFIG.guideProfileRequired.some((route) => pathname.startsWith(route));

const isAllowedIncompleteRoute = (pathname: string): boolean =>
  ROUTE_CONFIG.allowedIncomplete.some((route) => pathname === route);

const shouldRedirectIncompleteUser = (
  user: UserResponse["user"],
  pathname: string,
): boolean => {
  if (!user || user.isProfileComplete) return false;

  return (
    !pathname.startsWith(`/${user.username}`) &&
    !isGuideProfileRequired(pathname) &&
    !isAllowedIncompleteRoute(pathname)
  );
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!isRouteProtected(pathname)) {
    if (
      isRoutePublic(pathname) &&
      token &&
      (pathname === "/signin" || pathname === "/signup")
    ) {
      const authData = await validateToken(token);

      if (authData?.user) {
        const user = authData.user;

        if (user.role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        } else if (user.isProfileComplete) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
          return NextResponse.redirect(
            new URL(`/${user.username}`, request.url),
          );
        }
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const authData = await validateToken(token);

  if (!authData?.user) {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("token");
    return response;
  }

  const user = authData.user;

  if (isAdminRoute(pathname) && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/dashboard/buddy-ai" && user.role !== "TOURIST") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    isGuideProfileRequired(pathname) &&
    user.role === "GUIDE" &&
    !user.isProfileComplete
  ) {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  }

  if (shouldRedirectIncompleteUser(user, pathname)) {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
