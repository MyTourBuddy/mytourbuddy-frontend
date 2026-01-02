"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useAuthQueries";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="navbar-h z-999 bg-white sticky top-0 px-4 md:px-8 py-4 max-w-6xl w-full mx-auto flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Link href="/">MyTourBuddy</Link>

        {user && <span>Hello {user.firstName}</span>}

        {isAuthenticated ? (
          <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        ) : (
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
