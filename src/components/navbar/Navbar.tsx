"use client";

import logo from "@/../public/mytourbuddy.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import SearchDialogBox from "./SearchDialogBox";
import {
  TbBookmark,
  TbCalendar,
  TbLogout,
  TbNote,
  TbPackage,
  TbSearch,
  TbSettings,
  TbStar,
  TbTicket,
  TbUser,
} from "react-icons/tb";

const Navbar = () => {
  const { user, isAuthenticated, isGuide, isTourist, isAdmin } = useAuth();
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
              alt="mytourbuddy logo"
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
                      <div
                        key={pkg.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          router.push(`/packages/${pkg.id}`);
                        }}
                        className="block p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                      >
                        <div className="font-medium">{pkg.title}</div>
                        <div className="text-sm text-gray-500">
                          {pkg.location}
                        </div>
                      </div>
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

          {(!isAuthenticated || isTourist) && (
            <Link href={isAuthenticated ? "/dashboard/buddy-ai" : "/signin"}>
              TourBuddy Ai
            </Link>
          )}

          {(isGuide || isAdmin) && (
            <Link href={isGuide ? "/dashboard" : "/admin"}>Dashboard</Link>
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
                <DropdownMenuItem asChild>
                  <Link href={`/${user?.username}`}>
                    <TbUser className="mr-2" /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {(isTourist || isGuide) && (
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user?.isProfileComplete
                          ? "/dashboard/bookings"
                          : "/dashboard/settings"
                      }
                    >
                      <TbCalendar className="mr-2" />
                      {isTourist ? "My Bookings" : "Bookings"}
                    </Link>
                  </DropdownMenuItem>
                )}
                {isTourist && (
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user?.isProfileComplete
                          ? "/dashboard/reviews"
                          : "/dashboard/settings"
                      }
                    >
                      <TbStar className="mr-2" /> My Reviews
                    </Link>
                  </DropdownMenuItem>
                )}
                {isGuide && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user?.isProfileComplete
                            ? "/dashboard/packages"
                            : "/dashboard/settings"
                        }
                      >
                        <TbPackage className="mr-2" /> My Packages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user?.isProfileComplete
                            ? "/dashboard/reviews"
                            : "/dashboard/experiences"
                        }
                      >
                        <TbNote className="mr-2" /> My Experiences
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/tickets">
                        <TbTicket className="mr-2" />
                        Tickets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/bookings">
                        <TbBookmark className="mr-2" />
                        Bookings
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={isAdmin ? "/admin/settings" : "/dashboard/settings"}
                  >
                    <TbSettings className="mr-2" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <TbLogout className="mr-2" />
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
          <SearchDialogBox />
          <NavbarMobile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
