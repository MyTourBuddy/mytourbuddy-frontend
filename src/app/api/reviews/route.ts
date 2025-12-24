import { NextRequest, NextResponse } from "next/server";
import { reviews } from "@/data/Users";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guideId = searchParams.get("guideId");
  const touristId = searchParams.get("touristId");

  // Filter by guideId
  if (guideId) {
    const guideReviews = reviews.filter((review) => review.guideId === guideId);
    return NextResponse.json(guideReviews);
  }

  // Filter by touristId
  if (touristId) {
    const touristReviews = reviews.filter((review) => review.touristId === touristId);
    return NextResponse.json(touristReviews);
  }

  // Return all reviews
  return NextResponse.json(reviews);
}
