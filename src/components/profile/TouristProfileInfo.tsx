import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tourist } from "@/models/User";

const TouristProfileInfo = ({ user }: { user: Tourist }) => {
  const {
    firstName,
    lastName,
    email,
    age,
    phone,
    country,
    preferredDestinations,
    travelInterests,
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
              <p className="font-medium">{phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-medium">{country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences Card */}
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
                Preferred Destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {preferredDestinations?.map((destination) => (
                  <Badge key={destination} variant="secondary">
                    {destination}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Travel Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {travelInterests?.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Languages Spoken
              </p>
              <div className="flex flex-wrap gap-2">
                {languagesSpoken?.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings Card */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Username</p>
              <p className="text-sm text-muted-foreground">@johndoe</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">••••••••</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
          <div className="border-t pt-4 mt-4">
            <p className="font-medium text-destructive mb-2">Danger Zone</p>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default TouristProfileInfo;