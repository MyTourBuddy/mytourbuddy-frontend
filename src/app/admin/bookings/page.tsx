"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { useBookings } from "@/hooks/useBookingQueries";
import { usePackages } from "@/hooks/usePackageQueries";
import { useUpdateBooking } from "@/hooks/useBookingQueries";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PiSmileySad } from "react-icons/pi";
import {
  TbCancel,
  TbCircleCheck,
  TbClock,
  TbDotsVertical,
  TbEye,
  TbRun,
} from "react-icons/tb";
import { Separator } from "@/components/ui/separator";

const BookingsPage = () => {
  const { data: bookings, isLoading: loading, error } = useBookings();
  const { data: packages } = usePackages();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const updateBookingMutation = useUpdateBooking();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateBookingMutation.mutateAsync({
        bookingId,
        bookingData: { bookingStatus: "CANCELLED" },
      });
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const getPackageName = (pkgId: string) => {
    const pkg = packages?.find((p) => p.id === pkgId);
    return pkg?.title || "Unknown Package";
  };

  // sort bookings - latest first
  const sortedBookings = bookings?.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) || [];

  // filter bookings by search
  const filteredBookings =
    sortedBookings.filter((booking) => {
      const packageName = getPackageName(booking.pkgId);
      const bookingId = booking.id.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      return (
        packageName.toLowerCase().includes(searchLower) ||
        bookingId.includes(searchLower)
      );
    });

  // pagination calc
  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // reset page on filter
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading bookings...
        </div>
      </section>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Bookings not found
        </div>
      </section>
    );
  }

  if (error) {
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
  }

  return (
    <section className="max-w-5xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bookings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            </div>
            <div className="w-full md:w-80">
              <Input
                placeholder="Package Name or Booking Id"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            {currentBookings.map((booking) => (
              <Item size="sm" variant="outline" key={booking.id}>
                <ItemMedia className="text-lg">
                  {booking.bookingStatus === "PENDING" ? (
                    <TbClock className="text-amber-500" />
                  ) : booking.bookingStatus === "CONFIRMED" ? (
                    <TbRun className="text-green-500" />
                  ) : booking.bookingStatus === "COMPLETED" ? (
                    <TbCircleCheck className="text-primary" />
                  ) : (
                    booking.bookingStatus === "CANCELLED" && (
                      <TbCancel className="text-destructive" />
                    )
                  )}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{booking.id}</ItemTitle>
                  <ItemContent className="flex flex-col">
                    <p>{getPackageName(booking.pkgId)}</p>
                    <p>{formatDate(booking.bookingDate)}</p>
                  </ItemContent>
                </ItemContent>
                <ItemActions>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <TbDotsVertical className="text-lg" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          className="flex items-center"
                          href={`/admin/bookings/${booking.id}`}
                        >
                          <TbEye />
                          View Booking
                        </Link>
                      </DropdownMenuItem>
                      {!(
                        booking.bookingStatus === "COMPLETED" ||
                        booking.bookingStatus === "CANCELLED"
                      ) && (
                        <DropdownMenuItem
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={updateBookingMutation.isPending}
                        >
                          <TbCancel className="text-destructive" />
                          {updateBookingMutation.isPending
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ItemActions>
              </Item>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingsPage;
