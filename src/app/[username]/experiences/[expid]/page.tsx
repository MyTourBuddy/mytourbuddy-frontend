"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { Experience } from "@/schemas/experience.schema";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiSmileySad } from "react-icons/pi";

const ExperiencePage = () => {
  const { expid, username } = useParams<{ expid: string; username: string }>();
  const [expDetails, setExpDetails] = useState<Experience>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/experiences/${expid}`);

      if (!response.ok) {
        throw new Error("Failed to load experiences");
      }

      const data: Experience = await response.json();
      setExpDetails(data);
    } catch (err) {
      setError("Couldn't load this experience. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full">
        <div className="text-center text-muted-foreground flex justify-center md:flex-row flex-col items-center gap-3 md:gap-2 py-8">
          <Spinner className="size-6 md:size-4" />
          Loading guide's experience
        </div>
      </section>
    );
  }

  if (!expDetails) {
    return (
      <section className="max-w-5xl mx-auto w-full">
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
      <section className="max-w-5xl mx-auto w-full">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl w-full mx-auto">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${username}/experiences`}>
                Experiences
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{expDetails.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {expDetails.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(expDetails.experiencedAt).toLocaleDateString(undefined, {
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
      </div>
    </section>
  );
};

export default ExperiencePage;
