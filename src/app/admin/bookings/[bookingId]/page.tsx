"use client";

import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/hooks/useBookingQueries";
import { useUser } from "@/hooks/useUserQueries";
import { usePackage } from "@/hooks/usePackageQueries";
import { Spinner } from "@/components/ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import Link from "next/link";

const BookingPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();

  if (!bookingId || bookingId.trim() === "") {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Invalid booking ID
        </div>
      </section>
    );
  }

  const {
    data: booking,
    isLoading: bookingLoading,
    error,
  } = useBooking(bookingId);
  const { data: tourist, isLoading: touristLoading } = useUser(
    booking?.touristId || "",
    !!booking?.touristId,
  );
  const { data: guide, isLoading: guideLoading } = useUser(
    booking?.guideId || "",
    !!booking?.guideId,
  );
  const { data: pkg, isLoading: pkgLoading } = usePackage(
    booking?.pkgId || "",
    !!booking?.pkgId,
  );

  const isLoading =
    bookingLoading ||
    (booking?.touristId && touristLoading) ||
    (booking?.guideId && guideLoading) ||
    (booking?.pkgId && pkgLoading);

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading booking details...
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Booking not found
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Booking fetch error:", error);

    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          <div>
            <p className="font-medium">Failed to load booking</p>
            <p className="text-sm mt-1">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
            <p className="text-xs mt-2 text-muted-foreground">
              Booking ID: {bookingId}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default";
      case "PENDING":
        return "secondary";
      case "COMPLETED":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <section className="max-w-3xl mx-auto w-full pt-3 px-4">
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
              <BreadcrumbLink href="/admin/bookings">Bookings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{bookingId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold">
              {pkg?.title ||
                (booking?.pkgId ? "Loading package..." : "Package not found")}
            </h2>
            <Badge variant={getStatusBadgeVariant(booking.bookingStatus)}>
              {booking.bookingStatus}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Guide Name</p>
                <p className="font-medium">
                  {guide
                    ? `${guide.firstName} ${guide.lastName}`
                    : booking?.guideId
                      ? "Loading..."
                      : "Not assigned"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tourist Name</p>
                <p className="font-medium">
                  {tourist
                    ? `${tourist.firstName} ${tourist.lastName}`
                    : booking?.touristId
                      ? "Loading..."
                      : "Not assigned"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="font-medium">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Number of Members
                </p>
                <p className="font-medium">{booking.totalCount} People</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-semibold">
                ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingPage;
