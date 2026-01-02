import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Guide, Tourist } from "@/schemas/user.schema";

interface ProfileCompletionProps {
  user: Guide | Tourist;
}

const ProfileCompletion = ({ user }: ProfileCompletionProps) => {
  const getMissingFields = (): string[] => {
    const missing: string[] = [];

    if (!user.firstName) missing.push("First Name");
    if (!user.lastName) missing.push("Last Name");
    if (!user.email) missing.push("Email");
    if (!user.age) missing.push("Age");
    if (!user.phone) missing.push("Phone");

    if ("languages" in user) {
      // guide only
      if (!user.languages?.length) missing.push("Languages");
      if (!user.yearsOfExp) missing.push("Years of Experience");
      if (!user.specializations?.length) missing.push("Specializations");
      if (!user.emergencyContact) missing.push("Emergency Contact");
    } else {
      // tourist only
      if (!user.travelPreferences?.length) missing.push("Travel Preferences");
      if (!user.country) missing.push("Country");
    }

    return missing;
  };

  const missingFields = getMissingFields();
  const isComplete = missingFields.length === 0;

  // calc percentage
  const totalFields = "languages" in user ? 9 : 7;
  const missingCount = missingFields.length;
  const completionPercentage = Math.round(
    ((totalFields - missingCount) / totalFields) * 100
  );

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
                {missingFields.slice(0, 5).map((field: string) => (
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
