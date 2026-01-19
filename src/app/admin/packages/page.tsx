"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { usePackages } from "@/hooks/usePackageQueries";
import { useDeletePackage } from "@/hooks/usePackageQueries";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PiSmileySad } from "react-icons/pi";
import { TbDotsVertical, TbEye, TbTrash } from "react-icons/tb";

const PackagesPage = () => {
  const { data: packages, isLoading: loading, error } = usePackages();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const deletePackageMutation = useDeletePackage();

  const handleDeletePackage = async (packageId: string) => {
    try {
      await deletePackageMutation.mutateAsync(packageId);
      toast.success("Package deleted successfully!");
    } catch (error) {
      console.error("Failed to delete package:", error);
      toast.error("Failed to delete package. Please try again.");
    }
  };

  // sort packages - latest first
  const sortedPackages =
    packages?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ) || [];

  // filter packages by search
  const filteredPackages = sortedPackages.filter((pkg) => {
    const title = pkg.title.toLowerCase();
    const id = pkg.id.toLowerCase();
    const location = pkg.location?.toLowerCase() || "";
    const searchLower = searchTerm.toLowerCase();

    return (
      title.includes(searchLower) ||
      id.includes(searchLower) ||
      location.includes(searchLower)
    );
  });

  // pagination calc
  const totalItems = filteredPackages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  // reset page on filter
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading packages...
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Packages not found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
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
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
            </div>
            <div className="w-full md:w-80">
              <Input
                placeholder="Package Title, ID or Location"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            {currentPackages.map((pkg) => (
              <Item size="sm" variant="outline" key={pkg.id}>
                <ItemMedia>
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    height={100}
                    width={75}
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemDescription>{pkg.id}</ItemDescription>
                  <ItemTitle>{pkg.title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <TbDotsVertical className="text-lg" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          className="flex items-center"
                          href={`/admin/packages/${pkg.id}`}
                        >
                          <TbEye />
                          View Package
                        </Link>
                      </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePackage(pkg.id)}
                      disabled={deletePackageMutation.isPending}
                    >
                      <TbTrash className="text-destructive" />
                      {deletePackageMutation.isPending
                        ? "Deleting..."
                        : "Delete Package"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ItemActions>
              </Item>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
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
        </div>
      </div>
    </section>
  );
};

export default PackagesPage;
