import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Guide } from "@/schemas/user.schema";

const GuideProfileInfo = ({ user }: { user: Guide }) => {
  const {
    firstName,
    lastName,
    email,
    age,
    phone,
    bio,
    languages,
    yearsOfExp,
    specializations,
    certifications,
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
                  Years of Experience
                </p>
                <p className="font-medium">{yearsOfExp}</p>
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
    </div>
  );
};

export default GuideProfileInfo;
