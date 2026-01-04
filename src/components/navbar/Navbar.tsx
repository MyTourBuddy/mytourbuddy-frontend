"use client";

import logo from "@/../public/mytourbuddy.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { TbMenu } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/schemas/user.schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuthQueries";
import NavbarMobile from "./NavbarMobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-white/30 filter backdrop-blur-3xl sticky top-0 navbar-h w-full border-b shadow-sm flex items-center justify-center z-50">
      <div className="max-w-6xl w-full flex justify-between items-center text-base px-4">
        <Link href="/">
          <Image
            src={logo}
            alt="mytourbuddy lofo"
            className="h-14 w-14 md:h-16 md:w-16"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/packages">Packages</Link>

          {!isAuthenticated ||
            (user?.role === "TOURIST" && (
              <Link href="/dashboard/findbuddy">Find Buddy</Link>
            ))}

          {(user?.role === "GUIDE" || user?.role === "ADMIN") && (
            <Link href={user.role === "GUIDE" ? "/dashboard" : "/admin"}>
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarImage src={user?.avatar} alt={`${user?.firstName}`} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0).toUpperCase()}
                    {user?.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-1000">
                <Link href={`/${user?.username}`}>
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                </Link>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/signin">
                <Button variant="ghost" className="text-base">
                  Signin
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="text-base">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* for mobile navbar */}
        <div className="flex md:hidden">
          <NavbarMobile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const DesktopDropdown = ({ user }: { user: User }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={user?.avatar} alt={`${user?.firstName}`} />
      <AvatarFallback>
        {user?.firstName?.charAt(0).toUpperCase()}
        {user?.lastName?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
