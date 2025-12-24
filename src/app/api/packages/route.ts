import { NextResponse } from "next/server";
import { packages } from "@/data/Users";

export async function GET() {
  return NextResponse.json(packages);
}
