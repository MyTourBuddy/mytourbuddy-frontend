"use client";

import { Guide } from "@/schemas/user.schema";
import { usePackagesByGuide } from "@/hooks/usePackageQueries";
import PackageCard from "../PackageCard";
import { Spinner } from "../ui/spinner";
import { PiSmileySad } from "react-icons/pi";

const PackagesSection = ({ user }: { user: Guide }) => {
  const {
    data: packages,
    isLoading: loading,
    error,
  } = usePackagesByGuide(user.id);

  const pathname = `/${user.username}/packages`;

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <Spinner className="size-6 md:size-4" />
          Loading packages...
        </div>
      </section>
    );
  }

  if (!packages) {
    return (
      <section className="mx-auto max-w-4xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No packages found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl w-full text-destructive">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} pathname={pathname} />
      ))}
    </div>
  );
};

export default PackagesSection;
