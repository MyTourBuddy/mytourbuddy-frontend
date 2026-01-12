"use client";

import { useMyBookings } from "@/hooks/useBookingQueries";
import { Spinner } from "../../ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import TouristBookingCard from "./TouristBookingCard";

const AllTouristBookings = () => {
  const { data: bookings, isLoading: loading, error } = useMyBookings();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sortedBookings = bookings
    ? [...bookings].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const totalPages =
    sortedBookings.length > 0
      ? Math.ceil(sortedBookings.length / itemsPerPage)
      : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = sortedBookings.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <Spinner className="size-6 md:size-4" />
          Loading bookings...
        </div>
      </section>
    );
  }

  if (!bookings) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No bookings found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-5xl w-full text-destructive">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {currentBookings.map((booking) => (
          <TouristBookingCard key={booking.id} data={booking} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
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
  );
};

export default AllTouristBookings;
