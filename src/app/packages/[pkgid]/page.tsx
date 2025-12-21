"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Package } from "@/schemas/package.schema";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { GrCurrency, GrMap, GrUserWorker } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import { PiSmileySad } from "react-icons/pi";
import { TbAlertCircle, TbX } from "react-icons/tb";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";

const PackagePage = () => {
  const { pkgid } = useParams<{ pkgid: string }>();
  const [pkgDetails, setPkgDetails] = useState<Package>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/packages/${pkgid}`);

      if (!response.ok) {
        throw new Error("Failed to load packages");
      }

      const data: Package = await response.json();
      setPkgDetails(data);
    } catch (err) {
      setError("Couldn't load this package. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading tour package
        </div>
      </section>
    );
  }

  if (!pkgDetails) {
    return (
      <section className="max-w-5xl mx-auto w-full">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Package not found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto w-full">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error}
        </div>
      </section>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <Card className="col-span-1 md:col-span-4">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="relative aspect-video rounded-t-lg">
                {pkgDetails.image ? (
                  <Image
                    src={pkgDetails.image}
                    alt={pkgDetails.title}
                    fill
                    className="object-cover rounded-t-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {pkgDetails.title}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex md:hidden items-center gap-2">
                    <GrCurrency className="text-primary text-base" />
                    <p>
                      <span className="font-semibold text-lg text-primary">
                        {formatCurrency(pkgDetails.price)}
                      </span>
                      <span className="text-sm">/person</span>
                    </p>
                  </div>

                  <div className="flex md:hidden items-center gap-2">
                    <LuAlarmClock className="text-primary text-base" />
                    <span className="text-sm">{pkgDetails.duration}</span>
                  </div>

                  <div className="flex md:hidden items-center gap-2 sm:col-span-2">
                    <GrMap className="text-primary text-base" />
                    <span className="text-sm">{pkgDetails.location}</span>
                  </div>

                  {pkgDetails.maxGroupSize && (
                    <div className="flex md:hidden items-center gap-2 sm:col-span-2">
                      <HiUserGroup className="text-primary text-base" />
                      <span className="text-sm">
                        Max {pkgDetails.maxGroupSize} people
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <GrUserWorker className="text-primary text-base" />
                    <span className="text-sm text-muted-foreground">
                      by {pkgDetails.guideId}
                    </span>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-semibold">Overview</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pkgDetails.description}
                </p>

                <div className="flex flex-col gap-2">
                  <h2 className="text-base sm:text-lg font-semibold">
                    What's Included
                  </h2>
                  <ul className="space-y-2">
                    {pkgDetails.included.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <GiCheckMark className="mt-1 text-primary" />
                        <span className="text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkgDetails.notIncluded &&
                  pkgDetails.notIncluded.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h2 className="text-base sm:text-lg font-semibold">
                        Not Included
                      </h2>
                      <ul className="space-y-2">
                        {pkgDetails.notIncluded.map((item, index) => (
                          <li key={index} className="flex gap-3">
                            <TbX className="mt-1 text-destructive" />
                            <span className="text-sm sm:text-base text-muted-foreground">
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
          </CardContent>
        </Card>

        {/* pricing card */}
        <Card className="col-span-1 md:col-span-2 h-fit">
          <CardContent className="flex flex-col gap-6">
            <div className="md:flex hidden flex-col gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground">Price per person</p>
                <p className="text-primary font-bold text-2xl">
                  {formatCurrency(pkgDetails.price)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground">Duration</p>
                <p>{pkgDetails.duration}</p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground">Location</p>
                <p>{pkgDetails.location}</p>
              </div>

              {pkgDetails.maxGroupSize && (
                <div className="flex flex-col gap-3">
                  <p className="text-muted-foreground">Group size</p>
                  <p>Up to {pkgDetails.maxGroupSize} people</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button size="lg" className="w-full">
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <IoChatbubbleOutline /> Contact Guide
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              You won't be charged yet
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PackagePage;
