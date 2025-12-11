"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Guide } from "@/models/User";
import { getPackages } from "@/lib/api";
import { Package } from "@/models/Package";

const PackagesSection = ({ user }: { user: Guide }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages(user.id);
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [user.id]);

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {loading ? (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">Loading packages...</p>
          </CardContent>
        </Card>
      ) : packages.length > 0 ? (
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="h-full">
              <CardContent className="px-2 flex flex-col gap-4">
                <div className="aspect-video bg-muted rounded-lg shrink-0"></div>
                <div className="flex-1 flex flex-col gap-3">
                  <CardTitle>{pkg.title}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No packages added yet. Create your first package!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PackagesSection;
