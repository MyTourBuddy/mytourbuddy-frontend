"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/models/User";
import { getExperiences } from "@/lib/api";
import { Experience } from "@/models/Experience";

const ExperiencesSection = ({ user }: { user: User }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences(user.id);
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [user.id]);

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {loading ? (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">Loading experiences...</p>
          </CardContent>
        </Card>
      ) : experiences.length > 0 ? (
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiences.map((exp) => (
            <Card key={exp.id} className="h-full">
              <CardContent className="px-2 flex flex-col gap-4">
                <div className="aspect-video bg-muted rounded-lg shrink-0"></div>
                <div className="flex-1 flex flex-col gap-3">
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription>{exp.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No experiences shared yet. Start by adding your first experience!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExperiencesSection;
