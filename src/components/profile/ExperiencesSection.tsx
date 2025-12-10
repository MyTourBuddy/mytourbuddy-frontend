"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const ExperiencesSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Sigiriya Rock Fortress Tour",
      description:
        "Guided 150+ tourists through the ancient Sigiriya Rock Fortress, sharing historical insights about the 5th-century palace and its magnificent frescoes. Specialized in early morning climbs to catch the breathtaking sunrise views.",
    },
    {
      id: "2",
      title: "Kandy Cultural Experience",
      description:
        "Led cultural tours in Kandy, including visits to the Temple of the Tooth, traditional dance performances, and local spice gardens. Expert in explaining the rich Buddhist heritage and colonial history of the hill capital.",
    },
    {
      id: "3",
      title: "Yala National Park Safari",
      description:
        "Conducted wildlife safaris in Yala National Park with a focus on leopard tracking and bird watching. Successfully spotted leopards in 80% of tours and identified over 200 bird species for nature enthusiasts.",
    },
  ]);

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {/* <div className="flex md:flex-row flex-col md:items-center justify-between gap-y-2">
        <h2 className="text-xl font-semibold">Guide Experiences</h2>
        <Button className="gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add New Experience
        </Button>
      </div> */}

      {experiences.length > 0 ? (
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
        <Card className="p-12 bg-card border-border text-center">
          <p className="text-muted-foreground">
            No experiences shared yet. Start by adding your first experience!
          </p>
        </Card>
      )}
    </div>
  );
};

export default ExperiencesSection;
