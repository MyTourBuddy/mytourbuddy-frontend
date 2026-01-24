import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";

const protectedRoutes = ["/dashboard", "/admin"];
const publicRoutes = ["/signin", "/signup", "/"];
const adminOnlyRoutes = ["/admin"];

// only can access when the profiles are completed
const guideProfileRequiredRoutes = [
  "/dashboard/packages",
  "/dashboard/experiences",
];

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

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route),
  );
  const isAdminRoute = adminOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isGuideProfileRequiredRoute = guideProfileRequiredRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If it's a protected route, validate the token
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const authData = await validateToken(token);

    if (!authData || !authData.user) {
      const response = NextResponse.redirect(new URL("/signin", request.url));
      response.cookies.delete("token");
      return response;
    }

    const user = authData.user;

    if (isAdminRoute && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // buddy ai - tourists only
    if (pathname === "/dashboard/buddy-ai") {
      return user.role === "TOURIST"
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      isGuideProfileRequiredRoute &&
      user.role === "GUIDE" &&
      !user.isProfileComplete
    ) {
      return NextResponse.redirect(new URL("/dashboard/settings", request.url));
    }

    if (
      !user.isProfileComplete &&
      !pathname.startsWith(`/${user.username}`) &&
      !isGuideProfileRequiredRoute &&
      !(
        pathname === "/dashboard" ||
        pathname === "/dashboard/settings" ||
        pathname === "/dashboard/support"
      )
    ) {
      return NextResponse.redirect(new URL("/dashboard/settings", request.url));
    }

    return NextResponse.next();
  }

  if (
    isPublicRoute &&
    token &&
    (pathname === "/signin" || pathname === "/signup")
  ) {
    const authData = await validateToken(token);

    if (authData && authData.user) {
      const user = authData.user;

      if (user.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (user.isProfileComplete) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL(`/${user.username}`, request.url));
      }
    }
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
