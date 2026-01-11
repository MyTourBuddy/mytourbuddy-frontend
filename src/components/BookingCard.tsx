import { TbCalendar, TbCurrencyDollar, TbUsers } from "react-icons/tb";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

const BookingCard = () => {
  return (
    <Card>
      <CardHeader>
        {/* card header */}
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Package Title</CardTitle>
            <p className="text-sm">Guide name</p>
          </div>
          <Badge className="h-fit">Status</Badge>
        </div>
        <Separator />
      </CardHeader>
      {/* card content */}
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <TbCalendar />
          <div className="flex flex-col text-sm">
            <p>DATE</p>
            <p>2025-10-12</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <TbUsers />
          <div className="flex flex-col text-sm">
            <p>Members</p>
            <p>5</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <TbCurrencyDollar />
          <div className="flex flex-col text-sm">
            <p>Price</p>
            <p>500</p>
          </div>
        </div>
      </CardContent>

      {/* card footer */}
      <CardFooter className="flex flex-col gap-2">
        <Separator />
        <p>footer</p>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
