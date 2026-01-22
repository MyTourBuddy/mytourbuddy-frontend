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
import { useExperience } from "@/hooks/useExperienceQueries";
import { useParams } from "next/navigation";

const EditExperience = () => {
  const { expid } = useParams<{ expid: string }>();

  const { data: expDetails, isLoading: loading, error } = useExperience(expid);

  if (!expDetails) return <div>Experience not found</div>;

  return (
    <section className="max-w-2xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/experiences/${expid}`}>
                {expid}
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
