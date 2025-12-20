"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "@/schemas/package.schema";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { GrCurrency, GrMap, GrUserWorker } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import { TbAlertCircle, TbX } from "react-icons/tb";

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
      setError("Couldn't load your packages. Please try again later.");
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
      <section className="max-w-5xl mx-auto py-20">
        <div className="text-center text-muted-foreground">
          Loading tour package...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto py-20">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  if (!pkgDetails) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        Package not found
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <Card className="col-span-1 md:col-span-4">
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Image */}
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
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {pkgDetails.title}
                </h1>

                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <GrCurrency className="text-primary text-base" />
                    <span className="font-semibold text-lg">
                      Rs {pkgDetails.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <LuAlarmClock className="text-primary text-base" />
                    <span className="text-sm md:text-base">
                      {pkgDetails.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <GrMap className="text-primary text-base" />
                    <span className="text-sm md:text-base">
                      {pkgDetails.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <GrUserWorker className="text-primary text-base" />
                    <span className="text-sm md:text-base text-muted-foreground">
                      by {pkgDetails.username}
                    </span>
                  </div>
                </div>

                {/* Overview */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-base sm:text-lg font-semibold">
                    Overview
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {pkgDetails.description}
                  </p>
                </div>

                {/* Included */}
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

                {/* Not Included */}
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

                {/* Note */}
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
        <Card className="col-span-1 md:col-span-2">
          <CardContent>Book Now</CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PackagePage;
