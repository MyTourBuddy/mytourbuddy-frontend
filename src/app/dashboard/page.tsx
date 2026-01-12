"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import Link from "next/link";

const UserDashboard = () => {
  const { data: user, isLoading: loading, error } = useCurrentUser();
  const { isGuide } = useAuth();

  if (loading) return <p>loading...</p>;
  if (!user) return <p>user not found</p>;
  if (error) return <p>{error?.message}</p>;

  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-5xl mx-auto w-full px-4">
      <h1>Tourists and Guides dashboard will be here</h1>

      {isGuide && (
        <>
          <Link href="/dashboard/packages">Packages</Link>
          <Link href="/dashboard/experiences">Experiences</Link>
        </>
      )}

      <Link href="/dashboard/tour-planner">Tour Planner</Link>
      <Link href="/dashboard/settings">Settings</Link>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default UserDashboard;
