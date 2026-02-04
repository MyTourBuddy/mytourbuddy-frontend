import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { TbMenu, TbX } from "react-icons/tb";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/../public/mytourbuddy.svg";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useAuthQueries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";

const NavbarMobile = () => {
  const { user, isAuthenticated, isGuide, isTourist, isAdmin } = useAuth();
  const logoutMutation = useLogout();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-xl" variant="outline" size="icon-sm">
          <TbMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-1000 [&>button]:hidden flex flex-col gap-4">
        <SheetHeader>
          <div className="flex flex-row justify-between items-center">
            <SheetTitle className="sr-only w-fit">mytourbuddy</SheetTitle>
            <SheetDescription className="sr-only">
              mytourbuddy mobile navbar
            </SheetDescription>
            <Image className="h-12 w-12" src={logo} alt="mytourbuddy logo" />
            <SheetClose asChild>
              <Button variant="outline" size="icon">
                <TbX />
              </Button>
            </SheetClose>
          </div>
          <Separator />
        </SheetHeader>

        <div className="px-4 flex flex-col gap-3">
          <SheetClose asChild>
            <Link href="/" className="font-medium">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/packages" className="font-medium">
              Packages
            </Link>
          </SheetClose>

          {(!isAuthenticated || isTourist) && (
            <SheetClose asChild>
              <Link
                href={
                  isAuthenticated && isTourist
                    ? "/dashboard/buddy-ai"
                    : "/signin"
                }
                className="font-medium"
              >
                TourBuddy Ai
              </Link>
            </SheetClose>
          )}

          <Separator />

          {isAuthenticated ? (
            <>
              <Collapsible
                open={isDashboardOpen}
                onOpenChange={setIsDashboardOpen}
              >
                <CollapsibleTrigger className="flex items-center justify-between font-medium">
                  Dashboard
                  <TbChevronDown
                    className={`transition-transform ${
                      isDashboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <SheetClose asChild>
                    <Link href="/dashboard" className="font-medium block">
                      Overview
                    </Link>
                  </SheetClose>
                  {(isGuide || isTourist) && (
                    <SheetClose asChild>
                      <Link
                        href={
                          user?.isProfileComplete
                            ? "/dashboard/bookings"
                            : "/dashboard/settings"
                        }
                        className="font-medium block"
                      >
                        {isTourist ? "My Bookings" : "Bookings"}
                      </Link>
                    </SheetClose>
                  )}
                  {isTourist && (
                    <SheetClose asChild>
                      <Link
                        href={
                          user?.isProfileComplete
                            ? "/dashboard/reviews"
                            : "/dashboard/settings"
                        }
                        className="font-medium block"
                      >
                        My Reviews
                      </Link>
                    </SheetClose>
                  )}
                  {isGuide && (
                    <>
                      <SheetClose asChild>
                        <Link
                          href={
                            user?.isProfileComplete
                              ? "/dashboard/packages"
                              : "/dashboard/settings"
                          }
                          className="font-medium block"
                        >
                          My Packages
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={
                            user?.isProfileComplete
                              ? "/dashboard/experiences"
                              : "/dashboard/settings"
                          }
                          className="font-medium block"
                        >
                          My Experiences
                        </Link>
                      </SheetClose>
                    </>
                  )}
                  {(isGuide || isTourist) && (
                    <SheetClose asChild>
                      <Link
                        href="/dashboard/support"
                        className="font-medium block"
                      >
                        Support
                      </Link>
                    </SheetClose>
                  )}
                  {isAdmin && (
                    <>
                      <SheetClose asChild>
                        <Link
                          href="/admin/tickets"
                          className="font-medium block"
                        >
                          Tickets
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/admin/bookings"
                          className="font-medium block"
                        >
                          Bookings
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/admin/users" className="font-medium block">
                          Users
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/admin/packages"
                          className="font-medium block"
                        >
                          Packages
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <Collapsible open={isAccountOpen} onOpenChange={setIsAccountOpen}>
                <CollapsibleTrigger className="flex items-center justify-between font-medium">
                  Account
                  <TbChevronDown
                    className={`transition-transform ${
                      isAccountOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <SheetClose asChild>
                    <Link
                      href={`/${user?.username}`}
                      className="font-medium block"
                    >
                      My Profile
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href={isAdmin ? "/admin/settings" : "/dashboard/settings"}
                      className="font-medium block"
                    >
                      Settings
                    </Link>
                  </SheetClose>
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <SheetClose asChild>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="justify-start text-base font-medium px-0 w-full"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link href="/signin" className="font-medium">
                  Signin
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/signup" className="font-medium">
                  Get Started
                </Link>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
