"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Package } from "@/schemas/package.schema";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TbAlertCircle, TbPencil, TbTrash, TbX } from "react-icons/tb";
import { GiCheckMark } from "react-icons/gi";
import { GrCurrency, GrMap, GrUserWorker } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PackageDetails = () => {
  const pathname = usePathname();
  const { pkgid } = useParams<{ pkgid: string }>();
  const [pkgDetails, setPkgDetails] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`/api/packages/${pkgid}`);
      if (!response.ok) {
        throw new Error("Failed to load package");
      }
      const data: Package = await response.json();
      setPkgDetails(data);
    } catch (error) {
      console.error("Error fetching package:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [pkgid]);

  if (loading) {
    return <div className="max-w-2xl mx-auto py-8 text-center">Loading...</div>;
  }

  if (!pkgDetails) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        Package not found
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="relative aspect-video rounded-t-lg">
              <div className="absolute flex gap-1 top-1 right-1 z-10">
                <Link href={`${pathname}/edit`}>
                  <Button size="icon" variant="outline">
                    <TbPencil />
                  </Button>
                </Link>
                <Button size="icon" variant="destructive">
                  <TbTrash />
                </Button>
              </div>

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
                <h2 className="text-base sm:text-lg font-semibold">Overview</h2>
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
              {pkgDetails.notIncluded && pkgDetails.notIncluded.length > 0 && (
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
                <Alert>
                  <TbAlertCircle />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>{pkgDetails.note}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PackageDetails;
