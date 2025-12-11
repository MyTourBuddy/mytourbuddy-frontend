import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Guide } from "@/models/User";

const GuideProfileInfo = ({ user }: { user: Guide }) => {
  const {
    firstName,
    lastName,
    email,
    age,
    phone,
    country,
    bio,
    serviceLocation,
    languages,
    experience,
    specializations,
    certifications,
    hourlyRate,
    dailyRate,
    maxGroupSize,
    ageGroups,
    transportMode,
    serviceAreas,
    workingDays,
    workingHours,
    emergencyContact,
    website,
    socialMedia,
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

      {/* Professional Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Professional Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="font-medium">{bio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Service Location
                </p>
                <p className="font-medium">{serviceLocation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Years of Experience
                </p>
                <p className="font-medium">{experience}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Languages Spoken
              </p>
              <div className="flex flex-wrap gap-2">
                {languages?.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Specializations
              </p>
              <div className="flex flex-wrap gap-2">
                {specializations?.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Certifications</p>
              <p className="font-medium">{certifications}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Service Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
              <p className="font-medium">LKR {hourlyRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Rate</p>
              <p className="font-medium">LKR {dailyRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Group Size</p>
              <p className="font-medium">{maxGroupSize} people</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transport Mode</p>
              <p className="font-medium">{transportMode}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-2">Age Groups</p>
              <div className="flex flex-wrap gap-2">
                {ageGroups?.map((group) => (
                  <Badge key={group} variant="secondary">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Service Areas</p>
              <p className="font-medium">{serviceAreas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Availability Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Contact & Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Working Days</p>
              <p className="font-medium">{workingDays}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Working Hours</p>
              <p className="font-medium">{workingHours}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Emergency Contact</p>
              <p className="font-medium">{emergencyContact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Website</p>
              <p className="font-medium">{website}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Social Media</p>
              <p className="font-medium">{socialMedia}</p>
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

export default GuideProfileInfo;
