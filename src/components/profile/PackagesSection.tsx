"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Package {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const PackagesSection = () => {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "1",
      title: "Ancient Cities & Cultural Heritage",
      description:
        "5-day tour covering Anuradhapura, Polonnaruwa, and Sigiriya. Explore ancient kingdoms, climb the iconic Rock Fortress, and immerse yourself in Sri Lanka's rich history.",
    },
    {
      id: "2",
      title: "Hill Country Tea Trail",
      description:
        "3-day journey through Nuwara Eliya and Ella. Visit tea plantations, scenic train rides, waterfalls, and experience the cool climate of Sri Lanka's highlands.",
    },
    {
      id: "3",
      title: "Wildlife & Beach Paradise",
      description:
        "7-day adventure combining Yala Safari for leopard spotting and relaxing beach time in Mirissa. Perfect blend of wildlife and coastal experiences.",
    },
  ]);

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {/* <div className="flex md:flex-row flex-col md:items-center justify-between gap-y-2">
        <h2 className="text-xl font-semibold">Tour Packages</h2>
        <Button className="gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add Packages
        </Button>
      </div> */}

      {packages.length > 0 ? (
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="h-full">
              <CardContent className="px-2 flex flex-col gap-4">
                <div className="aspect-video bg-muted rounded-lg shrink-0"></div>
                <div className="flex-1 flex flex-col gap-3">
                  <CardTitle>
                    {pkg.title}
                  </CardTitle>
                  <CardDescription>
                    {pkg.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 bg-card border-border text-center">
          <p className="text-muted-foreground">
            No packages added yet. Create your first package!
          </p>
        </Card>
      )}
    </div>
  );
};

export default PackagesSection;
