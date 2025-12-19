"use client";

import { Package } from "@/schemas/package.schema";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PackageDetails = () => {
  const { pkgid } = useParams<{ pkgid: string }>();
  const [pkgDetails, setPkgDetails] = useState<Package>();

  const fetchPackage = async () => {
    const response = await fetch(`/api/packages/${pkgid}`);

    if (!response.ok) {
      throw new Error("Failed to load packages");
    }

    const data: Package = await response.json();
    setPkgDetails(data);
  };

  useEffect(() => {
    fetchPackage();
  }, []);
  return (
    <div>
      <p>{pkgid}</p>
      <div>{JSON.stringify(pkgDetails)}</div>
    </div>
  );
};

export default PackageDetails;
