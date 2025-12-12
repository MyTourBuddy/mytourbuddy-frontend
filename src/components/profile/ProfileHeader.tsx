import { TbPencil } from "react-icons/tb";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { User } from "@/schemas/user.schema";

const ProfileHeader = ({ user }: { user: User }) => {
  const { firstName, lastName, role, username, memberSince } = user;
  const fullName = firstName + " " + lastName;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  
  const formattedDate = new Date(memberSince).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="bg-accent relative">
      <CardContent className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4 py-2 md:py-4">
        <div className="flex justify-between md:hidden">
          <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center font-semibold text-2xl bg-background">
            {initials}
          </div>

          <Button size="icon" variant="outline">
            <TbPencil className="text-lg" />
          </Button>
        </div>

        <div className="hidden md:block">
          <div className="w-28 h-28 rounded-full border-2 border-primary flex items-center justify-center font-semibold text-4xl bg-background">
            {initials}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-1 md:gap-4 items-center mb-3">
            <h2 className="text-xl md:text-3xl font-semibold leading-tight">
              {fullName}
            </h2>
            <Badge className="px-2 py-0.5 text-xs md:text-sm">{role}</Badge>

            <Button
              size="icon"
              variant="outline"
              className="ml-auto hidden md:flex"
            >
              <Link href={`/${username}/edit`}>
                <TbPencil className="text-xl" />
              </Link>
            </Button>
          </div>

          <div className="space-y-1.5 md:space-y-2 text-sm md:text-base text-muted-foreground">
            <p className="font-medium text-foreground">@{username}</p>
            <p>Member since {formattedDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
