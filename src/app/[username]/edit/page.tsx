"use client";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm";
import TravelPrefForm from "@/components/profile/edit/TravelPrefForm";
import ProfessionalDetailsForm from "@/components/profile/edit/ProfessionalDetailsForm";
import ContactDetailsForm from "@/components/profile/edit/ContactDetailsForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

const EditProfile = () => {
  const { username } = useParams<{ username: string }>();
  return (
    <section className="max-w-4xl w-full mx-auto">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${username}`}>{username}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Update your information to complete your profile
          </p>
        </div>

        {/* common */}
        <Card className="py-2">
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
                <AccordionTrigger>Contact & Availability</AccordionTrigger>
                <AccordionContent>
                  <ContactDetailsForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EditProfile;
