"use client";

import { Package } from "@/schemas/package.schema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PackagePage = () => {
  const { pkgid } = useParams();
  const [packageDetails, setPackageDetails] = useState<Package>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/packages/${pkgid}`);

      if (!response.ok) {
        throw new Error("Failed to load packages");
      }

      const data: Package = await response.json();
      setPackageDetails(data);
    } catch (err) {
      setError("Couldn't load your packages. Please try again later.");
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
      <section className="max-w-5xl mx-auto py-20">
        <div className="text-center text-muted-foreground">
          Loading tour package...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto py-20">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-6">
        {JSON.stringify(packageDetails)}
      </div>
    </section>
  );
};

export default PackagePage;
