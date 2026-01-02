"use client";

import PackageCard from "@/components/packages/PackageCard";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { usePackages } from "@/hooks/usePackageQueries";
import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

const PackagesPage = () => {
  const pathname = usePathname();

  const { data: packages, isLoading: loading, error } = usePackages();

  return (
    <section className="max-w-4xl mx-auto w-full pt-3">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Tour Packages</h1>
          <p className="text-muted-foreground mt-1">
            Discover hand-picked experiences from trusted local guides
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <Spinner className="size-6 md:size-4" />
            Loading tour packages
          </div>
        ) : error ? (
          <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <p className="text-2xl md:text-lg">
              <PiSmileySad />
            </p>
            {error.message}
          </div>
        ) : (
          <>
            {/* cards */}
            {!packages || packages.length == 0 ? (
              <div className="text-center max-w-md flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
                <p className="text-2xl md:text-lg">
                  <PiSmileySad />
                </p>
                No tour packages yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} pathname={pathname} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PackagesPage;
