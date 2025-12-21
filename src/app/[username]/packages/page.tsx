"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package } from "@/schemas/package.schema";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";

const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  const pathname = usePathname();

  const username = "guide-002";

  const fetchPackages = async () => {
    const response = await fetch(`/api/packages/${username}`);

    if (!response.ok) {
      throw new Error("Failed to load packages");
    }

    const data: Package[] = await response.json();
    setPackages(data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold tracking-tight">My Packages</h1>
              <p className="text-muted-foreground mt-1">
                Manage your tour packages ({packages.length}/3)
              </p>
            </div>
            {packages.length < 3 && (
              <Link href={`${pathname}/new`}>
                <Button className="cursor-pointer">
                  <TbPlus className="mr-2" />
                  Add Package
                </Button>
              </Link>
            )}
          </div>

          <Separator />
        </div>

        {/* cards */}
        {packages.length == 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No packages yet. Create your first one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {packages.map((pkg) => (
              <Link key={pkg.id} href={`${pathname}/${pkg.id}`}>
                <Card className="overflow-hidden py-0 h-full">
                  <div className="relative aspect-video bg-gray-100">
                    {pkg.image ? (
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="px-5 md:py-2 mb-5 flex flex-col gap-2 md:gap-4">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:underline">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {pkg.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-medium">
                        ${pkg.price}
                      </Badge>
                      <Badge variant="outline">{pkg.location}</Badge>
                      <Badge variant="outline">{pkg.duration}</Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesPage;
