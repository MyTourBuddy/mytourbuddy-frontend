"use client";

import PackageCard from "@/components/PackageCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiSmileySad } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { usePackages, useSearchPackages } from "@/hooks/usePackageQueries";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PackagesContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    data: allPackages,
    isLoading: loadingAll,
    error: errorAll,
  } = usePackages();
  const {
    data: searchResults,
    isLoading: loadingSearch,
    error: errorSearch,
  } = useSearchPackages(searchQuery, !!searchQuery);

  const packages = searchQuery ? searchResults : allPackages;
  const loading = searchQuery ? loadingSearch : loadingAll;
  const error = searchQuery ? errorSearch : errorAll;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<
    "none" | "low-to-high" | "high-to-low"
  >("none");
  const itemsPerPage = 6;

  const sortedPackages = packages
    ? [...packages].sort((a, b) => {
        if (sortOrder === "low-to-high") return a.price - b.price;
        if (sortOrder === "high-to-low") return b.price - a.price;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    : [];

  const totalPages =
    sortedPackages.length > 0
      ? Math.ceil(sortedPackages.length / itemsPerPage)
      : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = sortedPackages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <div className="flex md:items-center flex-col md:flex-row justify-between gap-y-4">
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Tour Packages</h1>
            <p className="text-muted-foreground mt-1">
              Discover hand-picked experiences from trusted local guides
            </p>
          </div>
          <Select
            value={sortOrder}
            onValueChange={(value: "none" | "low-to-high" | "high-to-low") => {
              setSortOrder(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Newest First</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
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
            {!packages || packages.length === 0 ? (
              <div className="text-center max-w-md flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
                <p className="text-2xl md:text-lg">
                  <PiSmileySad />
                </p>
                No tour packages yet.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {currentPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} pathname={pathname} />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={page === currentPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const PackagesPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
};

export default PackagesPage;
