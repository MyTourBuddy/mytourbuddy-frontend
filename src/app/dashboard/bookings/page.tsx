"use client";

import AllTouristBookings from "@/components/bookings/tourist/AllTouristBookings";
import CanceledTouristBookings from "@/components/bookings/tourist/CanceledTouristBookings";
import CompletedTouristBookings from "@/components/bookings/tourist/CompletedTouristBookings";
import GuideBookingStats from "@/components/bookings/guide/GuideBookingStats";
import OngoingTouristBookings from "@/components/bookings/tourist/OngoingTouristBookings";
import PendingTouristBookings from "@/components/bookings/tourist/PendingTouristBookings";
import TouristsBookingStats from "@/components/bookings/tourist/TouristsBookingStats";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import GuideBookingCard from "@/components/bookings/guide/GuideBookingCard";
import AllGuideBookings from "@/components/bookings/guide/AllGuideBookings";
import PendingGuideBookings from "@/components/bookings/guide/PendingGuideBookings";
import AcceptedGuideBookings from "@/components/bookings/guide/AcceptedGuideBookings";
import CompletedGuideBookings from "@/components/bookings/guide/CompletedGuideBookings";
import CanceledGuideBookings from "@/components/bookings/guide/CanceledGuideBookings";

const BookingsPage = () => {
  const { isGuide, isTourist } = useAuth();
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
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bookings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your bookings
            </p>
          </div>

          {isTourist && <TouristsBookingStats />}
          {isGuide && <GuideBookingStats />}

          {isTourist && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="done">Done</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <AllTouristBookings />
              </TabsContent>
              <TabsContent value="pending">
                <PendingTouristBookings />
              </TabsContent>
              <TabsContent value="ongoing">
                <OngoingTouristBookings />
              </TabsContent>
              <TabsContent value="done">
                <CompletedTouristBookings />
              </TabsContent>
              <TabsContent value="canceled">
                <CanceledTouristBookings />
              </TabsContent>
            </Tabs>
          )}

          {isGuide && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <AllGuideBookings />
              </TabsContent>
              <TabsContent value="pending">
                <PendingGuideBookings />
              </TabsContent>
              <TabsContent value="accepted">
                <AcceptedGuideBookings />
              </TabsContent>
              <TabsContent value="completed">
                <CompletedGuideBookings />
              </TabsContent>
              <TabsContent value="canceled">
                <CanceledGuideBookings />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingsPage;
