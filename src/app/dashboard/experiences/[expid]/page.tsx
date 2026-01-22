"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BLURDATA } from "@/data/constants";
import { useExperience } from "@/hooks/useExperienceQueries";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

const ExperiencePage = () => {
  const { expid, username } = useParams<{ expid: string; username: string }>();
  const { data: expDetails, isLoading: loading, error } = useExperience(expid);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading {username}'s experience
        </div>
      </section>
    );
  }

  if (!expDetails) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
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
    <section className="max-w-2xl w-full mx-auto pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/experiences">
                Experiences
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{expDetails.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {expDetails.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {formatDate(expDetails.experiencedAt, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="relative aspect-video rounded-t-lg">
              {expDetails.image ? (
                <Image
                  src={expDetails.image}
                  alt={expDetails.title}
                  fill
                  className="object-cover rounded-t-lg"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {expDetails.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperiencePage;
