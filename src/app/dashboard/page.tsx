"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { usePackagesByGuide } from "@/hooks/usePackageQueries";
import { useExperiencesByGuide } from "@/hooks/useExperienceQueries";
import { useGuideBookings } from "@/hooks/useBookingQueries";
import { useMyBookings } from "@/hooks/useBookingQueries";
import { useReviewsByTourist } from "@/hooks/useReviewQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TbCalendar, TbNote, TbPackage, TbStar } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { PiSmileySad } from "react-icons/pi";

const UserDashboard = () => {
  const { data: user, isLoading: loading, error } = useCurrentUser();
  const { isGuide, isTourist } = useAuth();

  const { data: packages } = usePackagesByGuide(user?.id || "", !!user);
  const { data: experiences } = useExperiencesByGuide(user?.id || "", !!user);
  const { data: guideBookings } = useGuideBookings();
  const { data: myBookings } = useMyBookings();
  const { data: myReviews } = useReviewsByTourist(user?.id || "", !!user);

  if (loading)
    return (
      <section className="max-w-5xl mx-auto w-full pt-3 px-4">
        <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
          <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <Spinner className="size-6 md:size-4" />
            Loading my dashboard...
          </div>
        </section>
      </section>
    );

  if (!user)
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          User not found
        </div>
      </section>
    );

  if (error)
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
        </div>
      </section>
    );

  return (
    <section className="max-w-5xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold md:font-bold tracking-tight">
            {isGuide ? "Guide Dashboard" : "Tourist Dashboard"}
          </h1>
          <h2 className="text-muted-foreground mt-1">
            Welcome back, {user.firstName}
          </h2>
        </div>

        {/* content */}
        {isGuide && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Packages</CardTitle>
                  <TbPackage className="text-lg" />
                </div>
              </CardHeader>
              <CardContent className="mx-auto text-3xl font-semibold">
                {packages?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Experiences</CardTitle>
                  <TbNote className="text-lg" />
                </div>
              </CardHeader>
              <CardContent className="mx-auto text-3xl font-semibold">
                {experiences?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Bookings</CardTitle>
                  <TbCalendar className="text-lg" />
                </div>
              </CardHeader>
              <CardContent className="mx-auto text-3xl font-semibold">
                {guideBookings?.length || 0}
              </CardContent>
            </Card>
          </div>
        )}
        {isTourist && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Bookings</CardTitle>
                  <TbCalendar className="text-lg" />
                </div>
              </CardHeader>
              <CardContent className="mx-auto text-3xl font-semibold">
                {myBookings?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Reviews</CardTitle>
                  <TbStar className="text-lg" />
                </div>
              </CardHeader>
              <CardContent className="mx-auto text-3xl font-semibold">
                {myReviews?.length || 0}
              </CardContent>
            </Card>
          </div>
        )}

        <Separator />
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          {isGuide && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/dashboard/packages"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbPackage className="text-lg" />
                <div>
                  <p className="font-medium">Manage Packages</p>
                  <p className="text-sm text-muted-foreground">
                    Create and edit your tour packages
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/experiences"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbNote className="text-lg" />
                <div>
                  <p className="font-medium">Manage Experiences</p>
                  <p className="text-sm text-muted-foreground">
                    Add and organize your experiences
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/bookings"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbCalendar className="text-lg" />
                <div>
                  <p className="font-medium">View Bookings</p>
                  <p className="text-sm text-muted-foreground">
                    Check your upcoming bookings
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbStar className="text-lg" />
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-sm text-muted-foreground">
                    Update your profile and preferences
                  </p>
                </div>
              </Link>
            </div>
          )}
          {isTourist && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/dashboard/buddy-ai"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbStar className="text-lg" />
                <div>
                  <p className="font-medium">Plan Trip with AI</p>
                  <p className="text-sm text-muted-foreground">
                    Get personalized trip recommendations
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/bookings"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbCalendar className="text-lg" />
                <div>
                  <p className="font-medium">My Bookings</p>
                  <p className="text-sm text-muted-foreground">
                    View and manage your trips
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/reviews"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbStar className="text-lg" />
                <div>
                  <p className="font-medium">My Reviews</p>
                  <p className="text-sm text-muted-foreground">
                    See reviews you've written
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <TbStar className="text-lg" />
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-sm text-muted-foreground">
                    Update your profile and preferences
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
