import { TbPencil, TbTrash, TbStar, TbLoader } from "react-icons/tb";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Review } from "@/schemas/review.schema";
import { useUser } from "@/hooks/useUserQueries";
import { useDeleteReview } from "@/hooks/useReviewQueries";
import { useBooking } from "@/hooks/useBookingQueries";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helpers";
import { UpdateReviewForm } from "./ReviewForm";

const StarRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <TbStar
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">({rating}/5)</span>
    </div>
  );
};

const ReviewsListCard = ({ data }: { data: Review }) => {
  const { data: guideData } = useUser(data.guideId);
  const { data: bookingData } = useBooking(data.bookingId);
  const deleteReviewMutation = useDeleteReview();

  const handleDelete = async () => {
    try {
      await deleteReviewMutation.mutateAsync(data.id);
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-3">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src={guideData?.avatar} alt={guideData?.username} />
          <AvatarFallback>
            {guideData?.firstName?.[0]}
            {guideData?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">
            Review for @{guideData?.username || "Unknown Guide"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatDate(data.createdAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="leading-relaxed">{data.message}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3">
        <StarRating rating={data.rating} />
        <div className="flex gap-2">
          {bookingData && (
            <UpdateReviewForm
              review={data}
              booking={bookingData}
              trigger={
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <TbPencil className="w-4 h-4" />
                </Button>
              }
            />
          )}
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0"
            onClick={handleDelete}
            disabled={deleteReviewMutation.isPending}
          >
            {deleteReviewMutation.isPending ? (
              <TbLoader className="w-4 h-4 animate-spin" />
            ) : (
              <TbTrash className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewsListCard;
