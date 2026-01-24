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
import { useCurrentUser } from "@/hooks/useAuthQueries";
import Link from "next/link";

const ProfileSettingsPage = () => {
  const { data: user } = useCurrentUser();

  return (
    <section className="max-w-5xl w-full mx-auto pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2 md:gap-3">
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

              {user?.role === "TOURIST" && (
                <AccordionItem value="card2">
                  <AccordionTrigger>Travel Preferences</AccordionTrigger>
                  <AccordionContent>
                    <TravelPrefForm />
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* guide only */}
              {user?.role === "GUIDE" && (
                <AccordionItem value="card3">
                  <AccordionTrigger>Professional Details</AccordionTrigger>
                  <AccordionContent>
                    <ProfessionalDetailsForm />
                  </AccordionContent>
                </AccordionItem>
              )}
              {user?.role === "GUIDE" && (
                <AccordionItem value="card4">
                  <AccordionTrigger>Contact & Availability</AccordionTrigger>
                  <AccordionContent>
                    <ContactDetailsForm />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfileSettingsPage;
