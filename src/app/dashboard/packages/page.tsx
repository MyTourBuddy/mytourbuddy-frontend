"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { BLURDATA } from "@/data/constants";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import {
  useDeletePackage,
  usePackagesByGuide,
} from "@/hooks/usePackageQueries";
import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiSmileySad } from "react-icons/pi";
import { TbDots, TbEye, TbPencil, TbPlus, TbTrash } from "react-icons/tb";

const PackagesPage = () => {
  const pathname = usePathname();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();
  const {
    data: pkgs,
    isLoading: pkgsLoading,
    error: pkgError,
  } = usePackagesByGuide(user?.id || "", !!user?.id);
  const deletePackageMutation = useDeletePackage();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null);

  const loading = userLoading || pkgsLoading;
  const error = userError || pkgError;

  const handleDeleteClick = (packageId: string) => {
    setPackageToDelete(packageId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;

    try {
      await deletePackageMutation.mutateAsync(packageToDelete);
      toast.success("Package deleted successfully!");
      setDeleteDialogOpen(false);
      setPackageToDelete(null);
    } catch (error) {
      console.error("Failed to delete package:", error);
      toast.error("Failed to delete package. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPackageToDelete(null);
  };

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading my packages...
        </div>
      </section>
    );
  }

  if (!pkgs) {
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
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end justify-between">
            <div className="flex flex-col gap-2 md:gap-3">
              <h1 className="text-3xl font-bold tracking-tight">My Packages</h1>
              <p className="text-muted-foreground mt-1">
                Manage your tour packages ({pkgs.length}/3)
              </p>
            </div>
            {pkgs.length < 3 && (
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
        {pkgs.length == 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No packages yet. Create your first one to get started.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pkgs.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg hover:shadow-sm transition-shadow bg-card"
              >
                <div className="shrink-0 w-full md:w-32 h-48 md:h-32 rounded-md border border-border overflow-hidden bg-muted">
                  {pkg.image ? (
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="text-xs text-muted-foreground text-center px-2">
                        No image
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3 justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold line-clamp-2 flex-1">
                      {pkg.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                        >
                          <TbDots className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`${pathname}/${pkg.id}`}>
                            <TbEye />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`${pathname}/${pkg.id}/edit`}>
                            <TbPencil />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          onClick={() => handleDeleteClick(pkg.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <TbTrash className="text-destructive" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
                    <Badge
                      variant="default"
                      className="font-semibold text-xs text-center"
                    >
                      {formatCurrency(pkg.price)}/person
                    </Badge>
                    {pkg.duration && (
                      <Badge
                        variant="outline"
                        className="text-xs border border-border text-center"
                      >
                        {pkg.duration}
                      </Badge>
                    )}
                    {pkg.location && (
                      <Badge
                        variant="outline"
                        className="text-xs border border-border text-center"
                      >
                        {pkg.location}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this package? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={deletePackageMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deletePackageMutation.isPending}
            >
              {deletePackageMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PackagesPage;
