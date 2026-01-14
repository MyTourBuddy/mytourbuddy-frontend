"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Sidebar = () => {
  const { isGuide, isTourist } = useAuth();
  return (
    <div className="max-w-50 w-full h-full navbar-offset sticky top-20 px-8 py-3 border-r md:flex hidden">
      <div className="flex flex-col gap-3">
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/settings">Settings</Link>

        {isGuide && (
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/packages">Packages</Link>
            <Link href="/dashboard/experiences">Experiences</Link>
          </div>
        )}
        {isTourist && (
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/buddy-ai">TourBuddy Ai</Link>
            <Link href="/dashboard/reviews">My Reviews</Link>
          </div>
        )}
        <Link href="/dashboard/bookings">Bookings</Link>
        <Link href="/dashboard/support">Support</Link>
      </div>
    </div>
  );
};

export default Sidebar;
