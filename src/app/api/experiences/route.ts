import { NextRequest, NextResponse } from "next/server";
import { experiences } from "@/data/Users";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guideId = searchParams.get("guideId");

  // Filter by guideId
  if (guideId) {
    const guideExperiences = experiences.filter((exp) => exp.guideId === guideId);
    return NextResponse.json(guideExperiences);
  }

  // Return all experiences
  return NextResponse.json(experiences);
}
