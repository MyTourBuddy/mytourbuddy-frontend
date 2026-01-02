"use client";

import PackageCard from "@/components/packages/PackageCard";
import UserNotFound from "@/components/profile/UserNotFound";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { usePackagesByGuide } from "@/hooks/usePackageQueries";
import { useUserByUsername } from "@/hooks/useUserQueries";
import { useParams, usePathname } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

const PackagesPage = () => {
  const { username } = useParams<{ username: string }>();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUserByUsername(username);
  const {
    data: pkgsDetails,
    isLoading: pkgsLoading,
    error: pkgsError,
  } = usePackagesByGuide(user?.id || "", !!user?.id);

  const error = userError || pkgsError;

  const pathname = usePathname();

  if (userLoading) {
    return (
      <section className="max-w-4xl mx-auto w-full flex justify-center">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading {username} packages...
        </div>
      </section>
    );
  }
  if (!user) {
    return <UserNotFound username={username} />;
  } else if (pkgsLoading) {
    return (
      <section className="max-w-4xl mx-auto w-full flex justify-center">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading {username} packages...
        </div>
      </section>
    );
  }

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
              <BreadcrumbLink href={`/${username}`}>{username}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <h1 className="text-3xl font-bold tracking-tight">
          {username}'s Packages
        </h1>

        {error ? (
          <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <p className="text-2xl md:text-lg">
              <PiSmileySad />
            </p>
            {error.message}
          </div>
        ) : (
          <>
            {/* cards */}
            {!pkgsDetails || pkgsDetails.length === 0 ? (
              <div className="text-center max-w-md flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
                <p className="text-2xl md:text-lg">
                  <PiSmileySad />
                </p>
                No tour packages yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {pkgsDetails.map((pkg) => (
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
