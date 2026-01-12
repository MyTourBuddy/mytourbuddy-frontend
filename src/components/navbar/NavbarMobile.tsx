import {
  Sheet,
  SheetClose,
  SheetContent,
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

const NavbarMobile = () => {
  const { user, isAuthenticated, isGuide, isTourist, isAdmin } = useAuth();
  const logoutMutation = useLogout();

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
            <SheetTitle className="hidden w-fit">mytourbuddy</SheetTitle>
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
            <Link href="/" className="text-lg font-medium">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/packages" className="text-lg font-medium">
              Packages
            </Link>
          </SheetClose>

          {(!isAuthenticated || (isAuthenticated && isTourist)) && (
            <SheetClose asChild>
              <Link
                href={
                  isAuthenticated && isTourist
                    ? "/dashboard/buddy-ai"
                    : "/signin"
                }
                className="text-lg font-medium"
              >
                TourBuddy Ai
              </Link>
            </SheetClose>
          )}

          {isAuthenticated && (isGuide || isAdmin) && (
            <SheetClose asChild>
              <Link
                href={isGuide ? "/dashboard" : "/admin"}
                className="text-lg font-medium"
              >
                Dashboard
              </Link>
            </SheetClose>
          )}

          <Separator />

          {isAuthenticated ? (
            <>
              <SheetClose asChild>
                <Link
                  href={`/${user?.username}`}
                  className="text-lg font-medium"
                >
                  My Profile
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard/settings"
                  className="text-lg font-medium"
                >
                  Settings
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="justify-start text-lg font-medium px-0"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link href="/signin" className="text-lg font-medium">
                  Signin
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/signup" className="text-lg font-medium">
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
