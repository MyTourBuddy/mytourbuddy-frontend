import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm";
import TravelPrefForm from "@/components/profile/edit/TravelPrefForm";
import ProfessionalDetailsForm from "@/components/profile/edit/ProfessionalDetailsForm";
import ServiceInfoForm from "@/components/profile/edit/ServiceInfoForm";
import ContactDetailsForm from "@/components/profile/edit/ContactDetailsForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

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
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditProfile;
