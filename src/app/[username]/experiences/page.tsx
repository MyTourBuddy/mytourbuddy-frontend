"use client";

import ExperienceCard from "@/components/ExperienceCard";
import UserNotFound from "@/components/profile/UserNotFound";
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
import { BLURDATA } from "@/data/constants";
import {
  useExperiences,
  useExperiencesByGuide,
} from "@/hooks/useExperienceQueries";
import { useUserByUsername } from "@/hooks/useUserQueries";
import { Experience } from "@/schemas/experience.schema";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PiSmileySad } from "react-icons/pi";

const GuideExpsPage = () => {
  const pathname = usePathname();
  const { username } = useParams<{ username: string }>();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUserByUsername(username);
  const {
    data: expDetails,
    isLoading: expLoading,
    error: expError,
  } = useExperiencesByGuide(user?.id || "", !!user?.id);

  const error = userError || expError;

  if (userLoading) {
    return (
      <section className="max-w-4xl mx-auto w-full flex justify-center">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading {username}'s experiences...
        </div>
      </section>
    );
  }
  if (!user) {
    return <UserNotFound username={username} />;
  } else if (expLoading) {
    return (
      <section className="max-w-4xl mx-auto w-full flex justify-center">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading {username}'s experiences...
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto w-full">
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
            {!expDetails || expDetails.length == 0 ? (
              <div className="text-center max-w-md flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
                <p className="text-2xl md:text-lg">
                  <PiSmileySad />
                </p>
                No experiences added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {expDetails.map((exp) => (
                  <ExperienceCard key={exp.id} exp={exp} pathname={pathname} />
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
