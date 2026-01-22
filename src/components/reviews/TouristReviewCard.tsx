import { formatDate, getInitials } from "@/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Star } from "lucide-react";
import { Review } from "@/schemas/review.schema";
import { Guide } from "@/schemas/user.schema";
import { Separator } from "../ui/separator";

const TouristReviewCard = ({
  review,
  guide,
}: {
  review: Review;
  guide: Guide;
}) => {
  const formattedDate = formatDate(review.createdAt);

  return (
    <Card className="flex flex-col gap-3">
      <CardHeader>
        <CardTitle>Review to @{guide.username}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < (review.rating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed line-clamp-4">
          {review.message}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-gray-100">
          <AvatarImage
            src={guide.avatar}
            alt={`${guide.firstName} ${guide.lastName}`}
          />
          <AvatarFallback>
            {getInitials(guide.firstName, guide.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-900">
            {guide.firstName} {guide.lastName}
          </p>
          <p className="text-xs text-gray-500">Guide</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TouristReviewCard;
