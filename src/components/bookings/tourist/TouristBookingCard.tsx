"use client";

import {
  TbCalendar,
  TbCurrencyDollar,
  TbUser,
  TbUsers,
  TbStar,
} from "react-icons/tb";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Booking } from "@/schemas/booking.schema";
import { usePackage } from "@/hooks/usePackageQueries";
import { useUser } from "@/hooks/useUserQueries";
import { useUpdateBooking } from "@/hooks/useBookingQueries";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";
import { CreateReviewForm } from "@/components/reviews/ReviewForm";

const TouristBookingCard = ({ data }: { data: Booking }) => {
  const { data: pkgData } = usePackage(data.pkgId);
  const { data: guideData } = useUser(pkgData?.guideId || "", !!pkgData);
  const updateBookingMutation = useUpdateBooking();

  const handleCancelBooking = async () => {
    try {
      await updateBookingMutation.mutateAsync({
        bookingId: data.id,
        bookingData: { bookingStatus: "CANCELLED" },
      });
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
      console.error("Cancel booking error:", error);
    }
  };

  if (!pkgData || !guideData) {
    return null;
  }
  return (
    <Card>
      <CardHeader>
        {/* card header */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold md:text-lg">{pkgData.title}</h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-1">
            <div className="flex flex-wrap items-center gap-1">
              <TbUser />
              <p className="text-sm md:text-base">{guideData.username}</p>
            </div>
            <Badge
              className={`h-fit ${
                data.bookingStatus === "PENDING"
                  ? "bg-amber-500 text-primary-foreground"
                  : data.bookingStatus === "CONFIRMED"
                  ? "bg-green-500 text-primary-foreground"
                  : data.bookingStatus === "COMPLETED"
                  ? "bg-primary text-primary-foreground"
                  : data.bookingStatus === "CANCELLED"
                  ? "bg-destructive text-primary-foreground"
                  : "bg-gray-500 text-white"
              }`}
            >
              {data.bookingStatus}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">#{data.id}</p>
        <Separator />
      </CardHeader>
      {/* card content */}
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <TbCalendar />
          <div className="flex flex-col text-sm">
            <p>DATE</p>
            <p>{new Date(data.bookingDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <TbUsers />
          <div className="flex flex-col text-sm">
            <p>Members</p>
            <p>{data.totalCount}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <TbCurrencyDollar />
          <div className="flex flex-col text-sm">
            <p>Price</p>
            <p className="text-lg font-semibold">
              {formatCurrency(data.totalPrice)}
            </p>
          </div>
        </div>
      </CardContent>

      {/* card footer */}
      {data.bookingStatus != "CANCELLED" && (
        <CardFooter className="flex flex-col gap-2">
          <Separator />
          {(data.bookingStatus === "PENDING" ||
            data.bookingStatus === "CONFIRMED") && (
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant="destructive"
                onClick={handleCancelBooking}
                disabled={updateBookingMutation.isPending}
              >
                {updateBookingMutation.isPending
                  ? "Cancelling..."
                  : "Cancel Booking"}
              </Button>
            </div>
          )}
          {data.bookingStatus === "COMPLETED" && !data.isReviewed && (
            <CreateReviewForm
              booking={data}
              trigger={
                <Button className="w-full">
                  <TbStar className="mr-2" /> Write a Review
                </Button>
              }
            />
          )}
          <Button asChild variant="outline" className="w-full">
            <a href={`tel:${guideData.phone}`}>Contact Guide</a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TouristBookingCard;
