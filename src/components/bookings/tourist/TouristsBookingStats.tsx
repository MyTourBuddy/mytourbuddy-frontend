"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TbCircleCheck, TbClock, TbMoodSad, TbRun } from "react-icons/tb";
import { Separator } from "../../ui/separator";
import { useMyBookings } from "@/hooks/useBookingQueries";

const TouristsBookingStats = () => {
  const { data: bookings, isLoading: loading, error } = useMyBookings();

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="animate-pulse bg-muted h-6 w-20 rounded"></CardTitle>
                <div className="animate-pulse bg-muted h-6 w-6 rounded"></div>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="mx-auto">
              <div className="animate-pulse bg-muted h-8 w-8 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !bookings) {
    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-muted-foreground">Error</CardTitle>
                <div className="text-muted-foreground">!</div>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="mx-auto text-3xl text-muted-foreground">
              -
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const pendingCount = bookings.filter(
    (booking) => booking.bookingStatus === "PENDING"
  ).length;
  const ongoingCount = bookings.filter(
    (booking) => booking.bookingStatus === "CONFIRMED"
  ).length;
  const completedCount = bookings.filter(
    (booking) => booking.bookingStatus === "COMPLETED"
  ).length;
  const canceledCount = bookings.filter(
    (booking) => booking.bookingStatus === "CANCELLED"
  ).length;

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pending</CardTitle>
            <TbClock className="text-lg" />
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="mx-auto text-3xl font-semibold">{pendingCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ongoing</CardTitle>
            <TbRun className="text-lg" />
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="mx-auto text-3xl font-semibold">{ongoingCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Done</CardTitle>
            <TbCircleCheck className="text-lg" />
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="mx-auto text-3xl font-semibold">{completedCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Canceled</CardTitle>
            <TbMoodSad className="text-lg" />
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="mx-auto text-3xl font-semibold">{canceledCount}</CardContent>
      </Card>
    </div>
  );
};

export default TouristsBookingStats;
