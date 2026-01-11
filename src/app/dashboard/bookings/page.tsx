import BookingCard from "@/components/BookingCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TbCircleCheck, TbClock, TbMoodSad, TbRun } from "react-icons/tb";

const BookingsPage = () => {
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
              View and manage your tour guide bookings
            </p>
          </div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending</CardTitle>
                  <TbClock className="text-lg" />
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="mx-auto text-3xl">3</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ongoing</CardTitle>
                  <TbRun className="text-lg" />
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="mx-auto text-3xl">3</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Done</CardTitle>
                  <TbCircleCheck className="text-lg" />
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="mx-auto text-3xl">3</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Canceled</CardTitle>
                  <TbMoodSad className="text-lg" />
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="mx-auto text-3xl">3</CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-3 gap-3">
                <BookingCard />
              </div>
            </TabsContent>
            <TabsContent value="pending">Pending</TabsContent>
            <TabsContent value="ongoing">Ongoing</TabsContent>
            <TabsContent value="done">Done</TabsContent>
            <TabsContent value="canceled">Canceled</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default BookingsPage;
