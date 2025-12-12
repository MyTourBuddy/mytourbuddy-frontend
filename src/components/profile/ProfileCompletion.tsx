import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Guide, Tourist } from "@/schemas/user.schema";

interface ProfileCompletionProps {
  user: Guide | Tourist;
}

const ProfileCompletion = ({ user }: ProfileCompletionProps) => {
  const getMissingFields = (): string[] => {
    const missing: string[] = [];

    if (user.role === "guide") {
      const guide = user as Guide;

      // Personal info
      if (!guide.firstName?.trim()) missing.push("First Name");
      if (!guide.lastName?.trim()) missing.push("Last Name");
      if (!guide.email?.trim()) missing.push("Email");
      if (typeof guide.age !== 'number') missing.push("Age");
      if (!guide.avatar?.trim()) missing.push("Profile Photo");
      if (!guide.phone?.trim()) missing.push("Phone Number");

      // Account info (skip username/password as they're always set)

      // Guide specific
      if (!guide.languages || guide.languages.length === 0) missing.push("Languages");
      if (typeof guide.yearsOfExp !== 'number') missing.push("Years of Experience");
      if (!guide.specializations || guide.specializations.length === 0) missing.push("Specializations");
      if (typeof guide.dailyRate !== 'number') missing.push("Daily Rate");
      if (typeof guide.maxGroupSize !== 'number') missing.push("Max Group Size");
      if (!guide.transportMode?.trim()) missing.push("Transport Mode");
      if (!guide.ageGroups || guide.ageGroups.length === 0) missing.push("Age Groups");
      if (!guide.workingDays || guide.workingDays.length === 0) missing.push("Working Days");
    } else {
      const tourist = user as Tourist;

      // Personal info
      if (!tourist.firstName?.trim()) missing.push("First Name");
      if (!tourist.lastName?.trim()) missing.push("Last Name");
      if (!tourist.email?.trim()) missing.push("Email");
      if (typeof tourist.age !== 'number') missing.push("Age");
      if (!tourist.avatar?.trim()) missing.push("Profile Photo");
      if (!tourist.phone?.trim()) missing.push("Phone Number");
      if (!tourist.country?.trim()) missing.push("Country");

      // Account info (skip username/password as they're always set)

      // Tourist specific
      if (!tourist.travelPreferences || tourist.travelPreferences.length === 0) missing.push("Travel Preferences");
    }

    return missing;
  };

  const calculateCompletion = (): number => {
    if (user.role === "guide") {
      const guide = user as Guide;
      let filled = 0;
      const total = 19; // Total required fields for guides

      // Auto-generated fields (always filled)
      if (guide.id) filled++;
      if (guide.role) filled++;
      if (guide.memberSince) filled++;

      // Personal info
      if (guide.firstName?.trim()) filled++;
      if (guide.lastName?.trim()) filled++;
      if (guide.email?.trim()) filled++;
      if (typeof guide.age === 'number') filled++;
      if (guide.avatar?.trim()) filled++;
      if (guide.phone?.trim()) filled++;

      // Account info
      if (guide.username?.trim()) filled++;
      if (guide.password?.trim()) filled++;

      // Guide specific
      if (guide.languages && guide.languages.length > 0) filled++;
      if (typeof guide.yearsOfExp === 'number') filled++;
      if (guide.specializations && guide.specializations.length > 0) filled++;
      if (typeof guide.dailyRate === 'number') filled++;
      if (typeof guide.maxGroupSize === 'number') filled++;
      if (guide.transportMode?.trim()) filled++;
      if (guide.ageGroups && guide.ageGroups.length > 0) filled++;
      if (guide.workingDays && guide.workingDays.length > 0) filled++;

      return Math.round((filled / total) * 100);
    } else {
      const tourist = user as Tourist;
      let filled = 0;
      const total = 13; // Total required fields for tourists

      // Auto-generated fields (always filled)
      if (tourist.id) filled++;
      if (tourist.role) filled++;
      if (tourist.memberSince) filled++;

      // Personal info
      if (tourist.firstName?.trim()) filled++;
      if (tourist.lastName?.trim()) filled++;
      if (tourist.email?.trim()) filled++;
      if (typeof tourist.age === 'number') filled++;
      if (tourist.avatar?.trim()) filled++;
      if (tourist.phone?.trim()) filled++;
      if (tourist.country?.trim()) filled++;

      // Account info
      if (tourist.username?.trim()) filled++;
      if (tourist.password?.trim()) filled++;

      // Tourist specific
      if (tourist.travelPreferences && tourist.travelPreferences.length > 0) filled++;

      return Math.round((filled / total) * 100);
    }
  };

  const completionPercentage = calculateCompletion();
  const missingFields = getMissingFields();

  return (
    <Card className="bg-accent/30">
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Profile Completion</h3>
            <Badge variant="default">{completionPercentage}%</Badge>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Missing Fields */}
          {missingFields.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                Complete your profile to access dashboard
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Missing fields:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingFields.slice(0, 5).map((field) => (
                  <Badge key={field} variant="outline" className="text-xs">
                    {field}
                  </Badge>
                ))}
                {missingFields.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{missingFields.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Completion Message */}
          {missingFields.length === 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                ✓ Your profile is complete!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
