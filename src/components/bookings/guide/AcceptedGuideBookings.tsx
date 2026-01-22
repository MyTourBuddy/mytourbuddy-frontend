"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGuideBookings } from "@/hooks/useBookingQueries";
import { PiSmileySad } from "react-icons/pi";
import GuideBookingCard from "./GuideBookingCard";

const AcceptedGuideBookings = () => {
  const { data: bookings, isLoading: loading, error } = useGuideBookings();

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

  const accepetedBookings = bookings.filter(
    (booking) => booking.bookingStatus === "CONFIRMED"
  );

  if (accepetedBookings.length === 0) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No accepeted bookings found
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {accepetedBookings.map((booking) => (
          <GuideBookingCard key={booking.id} data={booking} />
        ))}
      </div>
    </div>
  );
};

export default AcceptedGuideBookings;
