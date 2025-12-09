// step 5 - preview before submission

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TbCheck, TbPencil } from "react-icons/tb";
import { useMemo } from "react";

interface ProfileData {
  role: "tourist" | "guide";
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
  username?: string;
  // Tourist specific
  country?: string;
  preferences?: string;
  // Guide specific
  location?: string;
  languages?: string;
  experience?: string;
}

interface StepProps {
  stepUp: () => void;
  onEdit: (step: number) => void;
  profileData: ProfileData;
}

const ProfilePreview = ({ stepUp, onEdit, profileData }: StepProps) => {
  const isTourist = useMemo(
    () => profileData.role === "tourist",
    [profileData.role]
  );

  const isProfileComplete = useMemo(() => {
    const requiredFields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.age,
      profileData.username,
    ];

    if (isTourist) {
      requiredFields.push(profileData.country);
    } else {
      requiredFields.push(profileData.location);
    }

    return requiredFields.every((field) => field && field.trim());
  }, [profileData, isTourist]);

  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3">
        <CardTitle className="text-xl md:text-2xl">
          Review Your Profile
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Make sure everything looks good before completing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
              Role
            </h3>
            <p className="text-sm md:text-base capitalize">
              {profileData.role || "Not selected"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
            className="h-8 px-2"
            aria-label="Edit role selection"
          >
            <TbPencil className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Personal Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  First Name
                </p>
                <p className="text-sm md:text-base">
                  {profileData.firstName || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Last Name
                </p>
                <p className="text-sm md:text-base">
                  {profileData.lastName || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Email
                </p>
                <p className="text-sm md:text-base">
                  {profileData.email || "-"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs md:text-xs text-muted-foreground">Age</p>
                <p className="text-sm md:text-base">{profileData.age || "-"}</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
            className="h-8 px-2"
            aria-label="Edit personal information"
          >
            <TbPencil className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Account Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
              Account
            </h3>
            <div>
              <p className="text-xs md:text-xs text-muted-foreground">
                Username
              </p>
              <p className="text-sm md:text-base">
                {profileData.username || "-"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(3)}
            className="h-8 px-2"
            aria-label="Edit account information"
          >
            <TbPencil className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Role-specific details */}
        {isTourist ? (
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
                Travel Details
              </h3>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Country
                </p>
                <p className="text-sm md:text-base">
                  {profileData.country || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Preferences
                </p>
                <p className="text-sm md:text-base">
                  {profileData.preferences || "-"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              className="h-8 px-2"
              aria-label="Edit travel details"
            >
              <TbPencil className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
                Guide Details
              </h3>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Location
                </p>
                <p className="text-sm md:text-base">
                  {profileData.location || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Languages
                </p>
                <p className="text-sm md:text-base">
                  {profileData.languages || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-xs text-muted-foreground">
                  Experience
                </p>
                <p className="text-sm md:text-base">
                  {profileData.experience
                    ? `${profileData.experience} years`
                    : "-"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              className="h-8 px-2"
              aria-label="Edit guide details"
            >
              <TbPencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={stepUp}
          disabled={!isProfileComplete}
          className="w-full h-10 md:h-11 text-sm md:text-base group"
        >
          <span>Complete Registration</span>
          <TbCheck className="transition-transform group-hover:scale-110 duration-300" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePreview;
