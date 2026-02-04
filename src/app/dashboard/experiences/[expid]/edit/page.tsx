"use client";

import { EditExperienceForm } from "@/components/profile/edit/ExperienceForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { useExperience } from "@/hooks/useExperienceQueries";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

const EditExperience = () => {
  const { expid } = useParams<{ expid: string }>();

  const { data: expDetails, isLoading: loading, error } = useExperience(expid);

  if (loading) {
    return (
      <section className="max-w-2xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading experience...
        </div>
      </section>
    );
  }

  if (!expDetails) {
    return (
      <section className="max-w-2xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Experience not found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-2xl mx-auto w-full px-4">
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
    <section className="max-w-2xl mx-auto w-full pt-3 px-4">
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
                <Link href={`/dashboard/experiences/${expid}`}>{expid}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
        <EditExperienceForm data={expDetails} />
      </div>
    </section>
  );
};

export default EditExperience;
