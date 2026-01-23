import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUpdateBooking } from "@/hooks/useBookingQueries";
import { usePackage } from "@/hooks/usePackageQueries";
import { useUser } from "@/hooks/useUserQueries";
import { Booking } from "@/schemas/booking.schema";
import { formatCurrency } from "@/utils/helpers";
import Link from "next/link";
import toast from "react-hot-toast";

const GuideBookingCard = ({ data }: { data: Booking }) => {
  const { data: pkgData } = usePackage(data.pkgId);
  const { data: touristData } = useUser(data.touristId);
  const updateBookingMutation = useUpdateBooking();

  const handleConfirmBooking = async () => {
    try {
      await updateBookingMutation.mutateAsync({
        bookingId: data.id,
        bookingData: { bookingStatus: "CONFIRMED" },
      });
      toast.success("Booking confirmed successfully!");
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
      console.error("Confirm booking error:", error);
    }
  };

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

  const handleCompleteBooking = async () => {
    try {
      await updateBookingMutation.mutateAsync({
        bookingId: data.id,
        bookingData: { bookingStatus: "COMPLETED" },
      });
      toast.success("Booking completed successfully!");
    } catch (error) {
      toast.error("Failed to complete booking. Please try again.");
      console.error("Complete booking error:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="-space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-foreground/75 text-sm">Tour</h3>
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
        <h2 className="md:text-lg font-semibold">{pkgData?.title}</h2>
        <p className="text-sm text-muted-foreground">#{data.id}</p>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-2">
          <div>
            <p className="text-sm">Tourists</p>
            <p className="font-semibold text-lg">{data.totalCount}</p>
          </div>
          <div>
            <p className="text-sm">Price</p>
            <p className="font-semibold text-lg">
              {formatCurrency(data.totalPrice)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm">Booked by</p>
          <Link href={`/${touristData?.username}`}>
            @{touristData?.username}
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-1">
        <Separator className="mb-2" />
        {data.bookingStatus === "PENDING" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full">
            <Button className="w-full" onClick={handleConfirmBooking}>
              Confirm
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancelBooking}
            >
              Cancel
            </Button>
          </div>
        )}
        {data.bookingStatus === "CONFIRMED" && (
          <Button className="w-full" onClick={handleCompleteBooking}>
            Complete Tour
          </Button>
        )}
        <Button asChild variant="outline" className="w-full">
          <a href={`tel:${touristData?.phone}`}>Contact Tourist</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuideBookingCard;
