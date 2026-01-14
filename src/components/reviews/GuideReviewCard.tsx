import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";
import { Review } from "@/schemas/review.schema";
import { User } from "@/schemas/user.schema";
import { formatDate, getInitials } from "@/utils/helpers";
import { Separator } from "../ui/separator";

const GuideReviewCard = ({
  review,
  tourist,
}: {
  review: Review;
  tourist: User;
}) => {
  if (!review || !tourist) {
    return <p>No review data</p>;
  }

  const formattedDate = formatDate(review.createdAt);

  return (
    <Card className="flex flex-col gap-3">
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
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
          <span className="text-sm text-gray-500 font-medium">
            {formattedDate}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed line-clamp-4">
          {review.message}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-gray-100">
          <AvatarImage
            src={tourist.avatar}
            alt={`${tourist.firstName} ${tourist.lastName}`}
          />
          <AvatarFallback>
            {getInitials(tourist.firstName, tourist.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-900">
            {tourist.firstName} {tourist.lastName}
          </p>
          <p className="text-xs text-gray-500">Tourist</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuideReviewCard;
