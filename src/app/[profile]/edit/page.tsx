"use client";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm";
import EditableCard from "@/components/profile/edit/EditableCard";
import TravelPrefForm from "@/components/profile/edit/TravelPrefForm";
import ProfessionalDetailsForm from "@/components/profile/edit/ProfessionalDetailsForm";
import ServiceInfoForm from "@/components/profile/edit/ServiceInfoForm";
import ContactDetailsForm from "@/components/profile/edit/ContactDetailsForm";
import ReviewsForm from "@/components/profile/edit/ReviewsForm";
import PackageInfoForm from "@/components/profile/edit/PackageInfoForm";
import ExperienceForm from "@/components/profile/edit/ExperienceForm";

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
      <EditableCard title="Personal Information">
        <PersonalInfoForm />
      </EditableCard>
      <EditableCard title="Reviews">
        <ReviewsForm />
      </EditableCard>

      {/* tourist */}
      <EditableCard title="Travel Preferences">
        <TravelPrefForm />
      </EditableCard>

      {/* guide */}
      <EditableCard title="Professional Details">
        <ProfessionalDetailsForm />
      </EditableCard>
      <EditableCard title="Service Information">
        <ServiceInfoForm />
      </EditableCard>
      <EditableCard title="Contact & Availability">
        <ContactDetailsForm />
      </EditableCard>
      <EditableCard title="My Packages">
        <PackageInfoForm />
      </EditableCard>
      <EditableCard title="My Experieces">
        <ExperienceForm />
      </EditableCard>
    </section>
  );
};

export default EditProfile;
