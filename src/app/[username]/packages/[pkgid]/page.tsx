"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useParams } from "next/navigation";
import { GiCheckMark } from "react-icons/gi";
import { GrCurrency, GrMap } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import { PiSmileySad } from "react-icons/pi";
import { TbAlertCircle, TbPhone, TbX } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePackage } from "@/hooks/usePackageQueries";
import { useUser } from "@/hooks/useUserQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BLURDATA } from "@/data/constants";
import BookingForm from "@/components/bookings/BookingForm";

const PackagePage = () => {
  const { pkgid, username } = useParams<{ pkgid: string; username: string }>();

  if (!pkgid) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p>
            <PiSmileySad />
          </p>
          Invalid package ID
        </div>
      </section>
    );
  }

  const {
    data: pkgDetails,
    isLoading: pkgLoading,
    error: pkgError,
  } = usePackage(pkgid);
  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
  } = useUser(pkgDetails?.guideId || "", !!pkgDetails?.guideId);

  if (pkgLoading) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading tour package
        </div>
      </section>
    );
  }

  if (!pkgDetails) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Package not found
        </div>
      </section>
    );
  }

  if (pkgError) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {pkgError.message}
        </div>
      </section>
    );
  }

  if (userLoading) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading tour package
        </div>
      </section>
    );
  }

  if (!userDetails) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Package not found
        </div>
      </section>
    );
  }

  if (userError) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {userError.message}
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
              <BreadcrumbLink href={`/${username}/packages`}>
                Packages
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pkgid}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-sm md:text-base">
          <Card className="col-span-1 md:col-span-4 pt-0 overflow-hidden">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-video bg-gray-100">
                {pkgDetails.image ? (
                  <Image
                    src={pkgDetails.image}
                    alt={pkgDetails.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 md:gap-6 px-2.5 md:px-4">
                <h1 className="font-bold text-foreground text-2xl md:text-3xl">
                  {pkgDetails.title}
                </h1>

                <div className="flex flex-col gap-3">
                  {userDetails && (
                    <Link
                      href={`/${userDetails.username}`}
                      className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                    >
                      <Avatar>
                        <AvatarImage
                          src={userDetails.avatar}
                          alt={`${userDetails.firstName} ${userDetails.lastName}`}
                        />
                        <AvatarFallback>
                          {userDetails.firstName?.[0]?.toUpperCase()}
                          {userDetails.lastName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground font-medium uppercase tracking-wide">
                          Guide
                        </span>
                        <span className="font-semibold text-foreground">
                          {userDetails.username}
                        </span>
                      </div>
                    </Link>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex md:hidden items-center gap-2">
                      <GrCurrency className="text-primary" />
                      <p>
                        <span className="font-semibold text-primary">
                          {formatCurrency(pkgDetails.price)}
                        </span>
                        <span>/person</span>
                      </p>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                      <LuAlarmClock className="text-primary" />
                      <span>{pkgDetails.duration}</span>
                    </div>

                    <div className="flex md:hidden items-center gap-2 sm:col-span-2">
                      <GrMap className="text-primary" />
                      <span>{pkgDetails.location}</span>
                    </div>

                    {pkgDetails.maxGroupSize && (
                      <div className="flex md:hidden items-center gap-2 sm:col-span-2">
                        <HiUserGroup className="text-primary" />
                        <span>Max {pkgDetails.maxGroupSize} people</span>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="font-semibold text-lg md:text-xl">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {pkgDetails.description}
                </p>

                {pkgDetails.included && pkgDetails.included.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg md:text-xl">
                      What's Included
                    </h2>
                    <ul className="space-y-2">
                      {pkgDetails.included.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <GiCheckMark className="mt-1 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkgDetails.notIncluded &&
                  pkgDetails.notIncluded.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold text-lg md:text-xl">
                        Not Included
                      </h2>
                      <ul className="space-y-2">
                        {pkgDetails.notIncluded.map((item, index) => (
                          <li key={index} className="flex gap-3">
                            <TbX className="mt-1 text-destructive" />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {pkgDetails.note && (
                  <Alert className="mt-2">
                    <TbAlertCircle />
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>{pkgDetails.note}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </Card>

          {/* pricing card */}
          <Card className="col-span-1 md:col-span-2 h-fit md:sticky md:top-24">
            <CardContent className="flex flex-col gap-6">
              <div className="md:flex hidden flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-sm">
                    Price per person
                  </p>
                  <p className="text-primary text-2xl font-bold">
                    {formatCurrency(pkgDetails.price)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p>{pkgDetails.duration}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-sm">Location</p>
                  <p>{pkgDetails.location}</p>
                </div>

                {pkgDetails.maxGroupSize && (
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-sm">Group size</p>
                    <p>Up to {pkgDetails.maxGroupSize} people</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <BookingForm
                  pricePerPerson={pkgDetails.price}
                  maxCount={pkgDetails.maxGroupSize}
                  packageId={pkgid}
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <a href={`tel:${userDetails.phone}`}>
                    <TbPhone /> Contact Guide
                  </a>
                </Button>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                You won't be charged yet
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PackagePage;
