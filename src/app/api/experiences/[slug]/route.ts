import { experiences } from "@/data/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (slug.startsWith("exp-")) {
    const exp = experiences.find((p) => p.id === slug);
    if (!exp) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(exp);
  }

  const guideExperiences = experiences.filter((exp) => exp.guideId === slug);

  if (guideExperiences.length === 0) {
    return NextResponse.json(
      { error: "No experiences found for this guide" },
      { status: 404 }
    );
  }

  return NextResponse.json(guideExperiences);
}
