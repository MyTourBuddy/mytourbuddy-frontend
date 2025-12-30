"use client";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { User } from "@/schemas/user.schema";
import { useAuth } from "@/context/AuthContext";
import EditProfileMenu from "./EditProfileMenu";
import Image from "next/image";

const ProfileHeader = ({ user }: { user: User }) => {
  const { user: currentUser } = useAuth();

  const { firstName, lastName, role, username, memberSince, avatar } = user;

  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "";
  const initials =
    firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      : "";

  const formattedDate = memberSince
    ? new Date(memberSince).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Card className="bg-accent relative">
      <CardContent className="flex flex-col md:flex-row md:items-start md:gap-6 gap-4 py-2 md:py-4">
        <div className="flex justify-between md:hidden">
          <div className="relative w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center font-semibold text-2xl bg-background">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${fullName}'s avatar`}
                fill
                className="rounded-full object-cover"
                loading="lazy"
                sizes="80px"
              />
            ) : (
              initials
            )}
          </div>

          {currentUser?.username === username && (
            <div className="md:hidden block">
              <EditProfileMenu />
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <div className="relative w-28 h-28 rounded-full border-2 border-primary flex items-center justify-center font-semibold text-4xl bg-background">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${fullName}'s avatar`}
                fill
                className="rounded-full object-cover"
                loading="lazy"
                sizes="112px"
              />
            ) : (
              initials
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-1 md:gap-4 items-center mb-3">
            <h2 className="text-xl md:text-3xl font-semibold leading-tight">
              {fullName}
            </h2>
            <Badge className="px-2 py-0.5 text-xs md:text-sm">{role}</Badge>

            {currentUser?.username === username && (
              <div className="hidden md:block ml-auto">
                <EditProfileMenu />
              </div>
            )}
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
