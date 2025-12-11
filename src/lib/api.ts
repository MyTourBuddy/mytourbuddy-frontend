import { Experience, Package, Review, User } from "@/models/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}

export async function getPackages(guideId?: string): Promise<Package[]> {
  const url = guideId
    ? `http://localhost:3000/api/packages?guideId=${guideId}`
    : "http://localhost:3000/api/packages";

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
}

export async function getExperiences(guideId?: string): Promise<Experience[]> {
  const url = guideId
    ? `http://localhost:3000/api/experiences?guideId=${guideId}`
    : "http://localhost:3000/api/experiences";

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch experiences");

  return res.json();
}

export async function getReviews(userId?: string, role?: "guide" | "tourist"): Promise<Review[]> {
  let url = "http://localhost:3000/api/reviews";
  
  if (userId && role) {
    const param = role === "guide" ? "guideId" : "touristId";
    url = `${url}?${param}=${userId}`;
  }

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch reviews");

  return res.json();
}
