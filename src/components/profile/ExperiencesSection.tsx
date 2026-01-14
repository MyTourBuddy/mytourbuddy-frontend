"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/schemas/experience.schema";
import { User } from "@/schemas/user.schema";
import ExperienceCard from "../ExperienceCard";
import { Spinner } from "../ui/spinner";
import { PiSmileySad } from "react-icons/pi";
import { useExperiencesByGuide } from "@/hooks/useExperienceQueries";

const ExperiencesSection = ({ user }: { user: User }) => {
  const {
    data: experiences,
    isLoading: loading,
    error,
  } = useExperiencesByGuide(user.id);

  const pathname = `/${user.username}/experiences`;

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <Spinner className="size-6 md:size-4" />
          Loading experiences...
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section className="mx-auto max-w-5xl w-full">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          No experiences found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-5xl w-full text-destructive">
        <div className="flex flex-col justify-center py-10 md:py-20 md:flex-row gap-2 items-center">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} pathname={pathname} />
      ))}
    </div>
  );
};

export default ExperiencesSection;
