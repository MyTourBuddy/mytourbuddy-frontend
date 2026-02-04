"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Sidebar = () => {
  const { isGuide, isTourist, isAdmin } = useAuth();
  return (
    <div className="max-w-50 w-full h-full navbar-offset sticky top-20 px-8 py-3 border-r md:flex hidden">
      <div className="flex flex-col gap-3">
        <Link href={isGuide || isTourist ? "/dashboard" : "/admin"}>
          Overview
        </Link>
        <Link
          href={
            isGuide || isTourist ? "/dashboard/settings" : "/admin/settings"
          }
        >
          Settings
        </Link>

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
        {(isTourist || isGuide) && (
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/bookings">Bookings</Link>
            <Link href="/dashboard/support">Support</Link>
          </div>
        )}
        {isAdmin && (
          <div className="flex flex-col gap-3">
            <Link href="/admin/tickets">Tickets</Link>
            <Link href="/admin/bookings">Bookings</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/packages">Packages</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
