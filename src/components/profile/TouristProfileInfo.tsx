import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tourist } from "@/schemas/user.schema";
import { useAuth } from "@/context/AuthContext";

const TouristProfileInfo = ({ user }: { user: Tourist }) => {
  const { user: currentUser } = useAuth();

  const {
    firstName,
    lastName,
    username,
    email,
    age,
    phone,
    country,
    travelPreferences,
    languagesSpoken,
  } = user;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{age}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{phone ? phone : "--"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-medium">{country}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Languages Spoken
                </p>
                <div className="flex flex-wrap gap-2">
                  {languagesSpoken && languagesSpoken.length > 0
                    ? languagesSpoken.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))
                    : "--"}
                </div>
              </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences Card */}
      {currentUser?.username === username && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Preferences
                </p>
                <div className="flex flex-wrap gap-2">
                  {travelPreferences?.map((prefs) => (
                    <Badge key={prefs} variant="secondary">
                      {prefs}
                    </Badge>
                  ))}
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TouristProfileInfo;
