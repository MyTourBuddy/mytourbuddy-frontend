import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { TbStar, TbSend, TbLoader } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Booking } from "@/schemas/booking.schema";
import { Review } from "@/schemas/review.schema";
import { usePackage } from "@/hooks/usePackageQueries";
import { useUser } from "@/hooks/useUserQueries";
import { useAuth } from "@/context/AuthContext";
import { useCreateReview, useUpdateReview } from "@/hooks/useReviewQueries";
import toast from "react-hot-toast";

interface ReviewFormProps {
  booking: Booking;
  trigger?: React.ReactNode;
}

const CreateReviewForm = ({ booking, trigger }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const { data: pkgData } = usePackage(booking.pkgId);
  const { data: guideData } = useUser(booking.guideId, !!booking.guideId);

  const createReviewMutation = useCreateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !pkgData) return;

    try {
      await createReviewMutation.mutateAsync({
        bookingId: booking.id,
        message: comment,
        rating,
      });

      setIsOpen(false);
      setRating(0);
      setComment("");

      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (!pkgData || !guideData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Your Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={guideData.avatar} alt={guideData.username} />
              <AvatarFallback>{guideData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{pkgData.title}</p>
              <p className="text-xs text-muted-foreground">
                with {guideData.username} •{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  <TbStar
                    className={`${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Comments</label>
            <Textarea
              placeholder="Share your thoughts about the tour..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 characters
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={rating === 0 || comment.trim() === ""}
              className="flex-1"
            >
              <TbSend className="mr-2" /> Submit Review
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface UpdateReviewFormProps {
  review: Review;
  booking: Booking;
  trigger?: React.ReactNode;
}

const UpdateReviewForm = ({
  review,
  booking,
  trigger,
}: UpdateReviewFormProps) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.message);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const { data: pkgData } = usePackage(booking.pkgId);
  const { data: guideData } = useUser(pkgData?.guideId || "", !!pkgData);

  const updateReviewMutation = useUpdateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !pkgData) return;

    try {
      await updateReviewMutation.mutateAsync({
        reviewId: review.id,
        reviewData: {
          message: comment,
          rating,
        },
      });

      setIsOpen(false);

      toast.success("Review updated successfully!");
    } catch (error) {
      console.error("Failed to update review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };

  if (!pkgData || !guideData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Your Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={guideData.avatar} alt={guideData.username} />
              <AvatarFallback>{guideData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{pkgData.title}</p>
              <p className="text-xs text-muted-foreground">
                with {guideData.username} •{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  <TbStar
                    className={`${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Comments</label>
            <Textarea
              placeholder="Share your thoughts about the tour..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 characters
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={rating === 0 || comment.trim() === ""}
              className="flex-1"
            >
              {updateReviewMutation.isPending ? (
                <p className="flex items-center">
                  <TbLoader className="animate-spin mr-2" />
                  <span>Updating...</span>
                </p>
              ) : (
                <p className="flex items-center">
                  <TbSend className="mr-2" />
                  <span>Update Review</span>
                </p>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateReviewForm, UpdateReviewForm };
