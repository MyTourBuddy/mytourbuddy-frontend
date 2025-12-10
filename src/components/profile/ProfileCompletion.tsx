import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const ProfileCompletion = () => {
  const completionPercentage = 90;
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
      </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
