"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Experience } from "@/schemas/experience.schema";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PiSmileySad } from "react-icons/pi";

const GuideExpsPage = () => {
  const pathname = usePathname();
  const { username } = useParams<{ username: string }>();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/experiences");

      if (!response.ok) {
        throw new Error("Failed to load experiences");
      }

      const data: Experience[] = await response.json();
      setExperiences(data);
    } catch (err) {
      setError("Couldn't load tour experiences. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <section className="max-w-5xl mx-auto w-full">
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
              <BreadcrumbPage>Experiences</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <h1 className="text-3xl font-bold tracking-tight">
          {username}'s Experiences
        </h1>

        {loading ? (
          <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <Spinner className="size-6 md:size-4" />
            Loading {username}'s experiences
          </div>
        ) : error ? (
          <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
            <p className="text-2xl md:text-lg">
              <PiSmileySad />
            </p>
            {error}
          </div>
        ) : (
          <>
            {/* cards */}
            {experiences.length == 0 ? (
              <div className="text-center max-w-md flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
                <p className="text-2xl md:text-lg">
                  <PiSmileySad />
                </p>
                No experiences added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {experiences.map((exp) => (
                  <Link key={exp.id} href={`${pathname}/${exp.id}`}>
                    <Card className="overflow-hidden py-0 h-full">
                      <div className="relative aspect-video bg-gray-100">
                        {exp.image ? (
                          <Image
                            src={exp.image || "/placeholder.svg"}
                            alt={exp.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="px-5 md:py-2 mb-5 flex flex-col gap-2 md:gap-4">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:underline">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exp.experiencedAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {exp.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GuideExpsPage;
