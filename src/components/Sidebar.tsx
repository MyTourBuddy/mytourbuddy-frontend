"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-50 w-full h-full navbar-offset sticky top-20 px-8 py-8 border-r md:flex hidden">
      <div className="flex flex-col gap-3">
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/settings">Settings</Link>

        {user?.role === "GUIDE" && (
          <>
            <Link href="/dashboard/packages">Packages</Link>
            <Link href="/dashboard/experiences">Experiences</Link>
          </>
        )}
        {user?.role === "TOURIST" && (
          <Link href="/dashboard/tour-planner">Tour Planner</Link>
        )}
        <Link href="/dashboard/bookings">Bookings</Link>
        <Link href="/dashboard/support">Support</Link>
      </div>
    </div>
  );
};

export default Sidebar;
