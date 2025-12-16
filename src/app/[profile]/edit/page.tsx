"use client";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm";
import TravelPrefForm from "@/components/profile/edit/TravelPrefForm";
import ProfessionalDetailsForm from "@/components/profile/edit/ProfessionalDetailsForm";
import ServiceInfoForm from "@/components/profile/edit/ServiceInfoForm";
import ContactDetailsForm from "@/components/profile/edit/ContactDetailsForm";
import ReviewsForm from "@/components/profile/edit/ReviewsForm";
import PackageInfoForm from "@/components/profile/edit/PackageInfoForm";
import ExperienceForm from "@/components/profile/edit/ExperienceForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const sampleUser = {
  id: "1",
  role: "tourist" as const,
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  age: 25,
  username: "janesmith",
  password: "password123",
  avatar: "https://via.placeholder.com/150",
  memberSince: "2023-01-01",
  phone: "+1234567890",
  isProfileComplete: false,
  country: "USA",
  travelPreferences: ["Adventure", "Culture"],
  preferredDestinations: ["Europe", "Asia"],
  travelInterests: ["Hiking", "Photography"],
  languagesSpoken: ["English", "French"],
};

const EditProfile = () => {
  return (
    <section className="max-w-4xl w-full mx-auto flex flex-col gap-6 md:gap-8 p-4">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
          Edit Profile
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Update your information to complete your profile
        </p>
      </div>

      {/* common */}
      <Card>
        <CardContent>
          <Accordion type="single" defaultValue="card1" collapsible>
            <AccordionItem value="card1">
              <AccordionTrigger>Personal Information</AccordionTrigger>
              <AccordionContent>
                <PersonalInfoForm />
              </AccordionContent>
            </AccordionItem>

            {/* tourist only */}
            <AccordionItem value="card2">
              <AccordionTrigger>Travel Preferences</AccordionTrigger>
              <AccordionContent>
                <TravelPrefForm />
              </AccordionContent>
            </AccordionItem>

            {/* guide only */}
            <AccordionItem value="card3">
              <AccordionTrigger>Professional Details</AccordionTrigger>
              <AccordionContent>
                <ProfessionalDetailsForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card4">
              <AccordionTrigger>Service Information</AccordionTrigger>
              <AccordionContent>
                <ServiceInfoForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card5">
              <AccordionTrigger>Contact & Availability</AccordionTrigger>
              <AccordionContent>
                <ContactDetailsForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card6">
              <AccordionTrigger>My Packages</AccordionTrigger>
              <AccordionContent>
                <PackageInfoForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card7">
              <AccordionTrigger>My Experieces</AccordionTrigger>
              <AccordionContent>
                <ExperienceForm />
              </AccordionContent>
            </AccordionItem>

            {/* common */}
            <AccordionItem value="card8">
              <AccordionTrigger>Reviews</AccordionTrigger>
              <AccordionContent>
                <ReviewsForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditProfile;
