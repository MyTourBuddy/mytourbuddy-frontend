"use client";

import logo from "@/../public/mytourbuddy.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
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
import { useSearchPackages } from "@/hooks/usePackageQueries";
import { useDebounce } from "@/hooks/useDebounce";
import NavbarMobile from "./NavbarMobile";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { TbSearch } from "react-icons/tb";
import SearchDialogBox from "./SearchDialogBox";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogout();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading } = useSearchPackages(debouncedQuery);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="bg-white/30 filter backdrop-blur-3xl sticky top-0 navbar-h w-full border-b shadow-sm flex items-center justify-center z-50">
      <div className="max-w-6xl w-full flex justify-between items-center text-base px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src={logo}
              alt="mytourbuddy lofo"
              className="h-14 w-14 md:h-16 md:w-16"
            />
          </Link>
          <div className="relative">
            <InputGroup className="rounded-full shadow-md hidden md:flex bg-white/50">
              <InputGroupInput
                name="search"
                placeholder="Find the best package..."
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="default"
                  className="rounded-full"
                  onClick={handleSearchSubmit}
                >
                  <TbSearch />
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {isDropdownOpen &&
              debouncedQuery &&
              (searchResults?.length || isLoading) && (
                <div className="absolute top-full mt-4 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-78 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults?.length ? (
                    searchResults.slice(0, 5).map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`/packages/${pkg.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block p-3 hover:bg-gray-50 border-b last:border-b-0"
                      >
                        <div className="font-medium">{pkg.title}</div>
                        <div className="text-sm text-gray-500">
                          {pkg.location}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No packages found
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/packages">Packages</Link>

          {!isAuthenticated && (
            <Link href="/dashboard/buddy-ai">TourBuddy Ai</Link>
          )}
          {isAuthenticated && user?.role === "TOURIST" && (
            <Link href="/dashboard/buddy-ai">TourBuddy Ai</Link>
          )}

          {(user?.role === "GUIDE" || user?.role === "ADMIN") && (
            <Link href={user.role === "GUIDE" ? "/dashboard" : "/admin"}>
              Dashboard
            </Link>
          )}

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
        <div className="flex items-center md:hidden">
          <SearchDialogBox/>
          <NavbarMobile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;