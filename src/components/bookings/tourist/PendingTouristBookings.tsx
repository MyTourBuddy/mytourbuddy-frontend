"use client";

import { useMyBookings } from "@/hooks/useBookingQueries";
import { Spinner } from "../../ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import TouristBookingCard from "./TouristBookingCard";

const PendingTouristBookings = () => {
  const { data: bookings, isLoading: loading, error } = useMyBookings();

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <Spinner className="size-6 md:size-4" />
          Loading pending bookings...
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
          No pending bookings found
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

  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus === "PENDING"
  );

  if (pendingBookings.length === 0) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No pending bookings found
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {pendingBookings.map((booking) => (
        <TouristBookingCard key={booking.id} data={booking} />
      ))}
    </div>
  );
};

export default PendingTouristBookings;
