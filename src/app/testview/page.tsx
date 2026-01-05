import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TbArrowRight } from "react-icons/tb";
import { LuCompass, LuMap, LuMousePointerClick } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const FindYourBuddy = () => {
  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-6 mt-3 navbar-offset">
        {/* breadcrumb */}
        <Breadcrumb className="mt-3">
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
              <BreadcrumbPage>Tour Planner</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4 md:gap-6 flex-1">
          <div className="flex flex-col text-center items-center gap-2 md:gap-3">
            <h1 className="text-2xl md:text-4xl font-semibold md:font-bold">
              Plan Your Adventure
            </h1>
            <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
              Choose your travel style: Browse curated packages or create your
              own personalized itinerary
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative flex flex-col gap-3 md:gap-4">
                <div className="text-3xl md:text-4xl text-primary">
                  <LuCompass />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold">
                  Browse Guides
                </h2>

                <p className="text-muted-foreground text-sm md:text-base max-w-md">
                  Explore our curated collection of travel packages designed by
                  experts. Search by destination, budget, or travel style to
                  find your perfect getaway.
                </p>

                <ul className="flex flex-col gap-2 md:gap-3 text-sm md:text-base mt-3">
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;Expert-curated destinations
                  </li>
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;Filtered by budget & duration
                  </li>
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;Ready-to-book itineraries
                  </li>
                </ul>

                <Link href="/packages">
                  <Button className="mt-3 group text-sm md:text-base w-full cursor-pointer">
                    View Packages&nbsp;
                    <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <div className="absolute inset-0 bg-linear-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative flex flex-col gap-3 md:gap-4">
                <div className="text-4xl text-primary">
                  <LuMap />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold">
                  Plan Your Own
                </h2>

                <p className="text-muted-foreground text-sm md:text-base max-w-md">
                  Create a custom itinerary tailored to your preferences. Tell
                  us where you want to go, and we'll help you plan the perfect
                  trip.
                </p>

                <ul className="flex flex-col gap-2 md:gap-3 text-sm md:text-base mt-3">
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;Personalized preferences
                  </li>
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;AI-powered recommendations
                  </li>
                  <li className="flex">
                    <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                    &nbsp;Downloadable PDF itinerary
                  </li>
                </ul>

                <Link href="/dashboard/findbuddy/plan">
                  <Button className="mt-3 group text-sm md:text-base w-full cursor-pointer">
                    Start Planning&nbsp;
                    <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourBuddy;
