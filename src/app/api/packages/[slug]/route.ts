import { packages } from "@/data/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (slug.startsWith("pkg-")) {
    const pkg = packages.find((p) => p.id === slug);
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    return NextResponse.json(pkg);
  }

  const guidePackages = packages.filter((pkg) => pkg.username === slug);

  if (guidePackages.length === 0) {
    return NextResponse.json(
      { error: "No packages found for this guide" },
      { status: 404 }
    );
  }

  return NextResponse.json(guidePackages);
}
