import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GuideProfileInfo = () => {
  // Mock data - replace with actual user data
  const personalData = {
    name: "Sasmitha Ashinsana",
    email: "sasmitha@example.com",
    age: "22",
    phone: "+94 77 123 4567",
    country: "Sri Lanka",
  };

  const professionalData = {
    bio: "Passionate tour guide with extensive knowledge of Sri Lankan culture and history.",
    location: "Colombo",
    languages: ["English", "Sinhala", "Tamil"],
    experience: "5",
    specializations: ["Culture", "Food & Cuisine", "Photography"],
    certifications: "Licensed Tour Guide, First Aid Certified",
  };

  const serviceData = {
    hourlyRate: "2500",
    dailyRate: "15000",
    maxGroupSize: "10",
    ageGroups: ["Adults", "Seniors"],
    transportMode: "Car",
    serviceAreas: "Colombo, Galle, Kandy, Sigiriya",
  };

  const contactData = {
    workingDays: "Monday - Saturday",
    workingHours: "8:00 AM - 6:00 PM",
    emergencyContact: "+94 77 987 6543",
    website: "www.sasmithatours.com",
    socialMedia: "@sasmithatours",
  };

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
              <p className="font-medium">{personalData.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{personalData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{personalData.age}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{personalData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-medium">{personalData.country}</p>
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
              <p className="font-medium">{professionalData.bio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Service Location
                </p>
                <p className="font-medium">{professionalData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Years of Experience
                </p>
                <p className="font-medium">{professionalData.experience}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Languages Spoken
              </p>
              <div className="flex flex-wrap gap-2">
                {professionalData.languages.map((lang) => (
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
                {professionalData.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Certifications</p>
              <p className="font-medium">{professionalData.certifications}</p>
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
              <p className="font-medium">LKR {serviceData.hourlyRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Rate</p>
              <p className="font-medium">LKR {serviceData.dailyRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Group Size</p>
              <p className="font-medium">{serviceData.maxGroupSize} people</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transport Mode</p>
              <p className="font-medium">{serviceData.transportMode}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-2">Age Groups</p>
              <div className="flex flex-wrap gap-2">
                {serviceData.ageGroups.map((group) => (
                  <Badge key={group} variant="secondary">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Service Areas</p>
              <p className="font-medium">{serviceData.serviceAreas}</p>
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
              <p className="font-medium">{contactData.workingDays}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Working Hours</p>
              <p className="font-medium">{contactData.workingHours}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Emergency Contact</p>
              <p className="font-medium">{contactData.emergencyContact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Website</p>
              <p className="font-medium">{contactData.website}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Social Media</p>
              <p className="font-medium">{contactData.socialMedia}</p>
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
