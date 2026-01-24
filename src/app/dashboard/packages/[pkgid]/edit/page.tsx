"use client";

import { PackageEditForm } from "@/components/profile/edit/PackageForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePackage } from "@/hooks/usePackageQueries";
import Link from "next/link";
import { useParams } from "next/navigation";

const EditPackage = () => {
  const { pkgid } = useParams<{ pkgid: string }>();

  const { data: pkgDetails, isLoading: loading, error } = usePackage(pkgid);

  if (!pkgDetails) return <div>Package not found</div>;

  return (
    <section className="max-w-5xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/packages/${pkgid}`}>{pkgid}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold tracking-tight">Edit Package</h1>
        <PackageEditForm pkg={pkgDetails} />
      </div>
    </section>
  );
};

export default EditPackage;
