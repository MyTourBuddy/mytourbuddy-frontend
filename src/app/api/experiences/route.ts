import { experiences } from "@/data/Users";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(experiences);
}
