import Link from "next/link";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/utils/helpers";
import { Package } from "@/schemas/package.schema";
import { BLURDATA } from "@/data/constants";

interface PackageCardProps {
  pkg: Package;
  pathname: string;
}

const PackageCard = ({ pkg, pathname }: PackageCardProps) => {
  return (
    <Link href={`${pathname}/${pkg.id}`}>
      <Card className="overflow-hidden py-0 h-full">
        <div className="relative aspect-video bg-gray-100">
          {pkg.image ? (
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="px-5 md:py-2 mb-5 flex flex-col gap-2 md:gap-4">
          <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:underline">
            {pkg.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {pkg.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="font-medium">
              {formatCurrency(pkg.price)}/person
            </Badge>
            <Badge variant="outline">{pkg.location}</Badge>
            <Badge variant="outline">{pkg.duration}</Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PackageCard;
