import { NextRequest, NextResponse } from "next/server";
import { allUsers } from "@/data/Users";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const id = searchParams.get("id");
  const role = searchParams.get("role");

  // Filter by username
  if (username) {
    const user = allUsers.find((u) => u.username === username);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  }

  // Filter by id
  if (id) {
    const user = allUsers.find((u) => u.id === id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  }

  // Filter by role
  if (role) {
    const users = allUsers.filter((u) => u.role === role);
    return NextResponse.json(users);
  }

  // Return all users
  return NextResponse.json(allUsers);
}
