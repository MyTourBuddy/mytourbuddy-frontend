import Link from "next/link";
import { Card } from "./ui/card";
import Image from "next/image";
import { Experience } from "@/schemas/experience.schema";
import { BLURDATA } from "@/data/constants";
import { formatDate } from "@/utils/helpers";

interface ExperienceCardProps {
  exp: Experience;
  pathname: string;
}

const ExperienceCard = ({ exp, pathname }: ExperienceCardProps) => {
  return (
    <Link href={`${pathname}/${exp.id}`}>
      <Card className="overflow-hidden py-0 h-full">
        <div className="relative aspect-video bg-gray-100">
          {exp.image ? (
            <Image
              src={exp.image}
              alt={exp.title}
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
            {exp.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(exp.experiencedAt)}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {exp.description}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default ExperienceCard;
