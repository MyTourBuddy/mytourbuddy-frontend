import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/data/Users";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guideId = searchParams.get("guideId");

  // Filter by guideId
  if (guideId) {
    const guidePackages = packages.filter((pkg) => pkg.guideId === guideId);
    return NextResponse.json(guidePackages);
  }

  // Return all packages
  return NextResponse.json(packages);
}
