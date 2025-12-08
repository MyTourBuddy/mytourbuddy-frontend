"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import RoleSelection from "./RoleSelection";
import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";
import TravelDetails from "./TravelDetails";
import GuideDetails from "./GuideDetails";
import ProfilePreview from "./ProfilePreview";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  username: string;
  password: string;
  confirmPassword: string;
  country: string;
  preferences: string;
  location: string;
  languages: string;
  experience: string;
}

type Role = "tourist" | "guide" | null;

const STORAGE_KEY = "onboarding-progress";
const TOTAL_STEPS = 5;

const OnboardingFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    preferences: "",
    location: "",
    languages: "",
    experience: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const {
          step: savedStep,
          role: savedRole,
          formData: savedFormData,
        } = JSON.parse(saved);
        setStep(savedStep);
        setRole(savedRole);
        setFormData(savedFormData);
      } catch (error) {
        console.error("Failed to load saved progress:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (step > 1 || role) {
      try {
        const dataToSave = {
          step,
          role,
          formData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            age: formData.age,
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            country: formData.country,
            preferences: formData.preferences,
            location: formData.location,
            languages: formData.languages,
            experience: formData.experience,
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  }, [step, role, formData]);

  const handleNext = useCallback(
    (data?: Partial<FormData>) => {
      if (data) {
        setFormData((prev) => ({ ...prev, ...data }));
      }

      if (step < TOTAL_STEPS) {
        setStep((prev) => prev + 1);
      } else {
        console.log("Onboarding complete!", { role, ...formData, ...data });
        localStorage.removeItem(STORAGE_KEY);
        router.push("/signin");
      }
    },
    [step, role, formData, router]
  );

  const handleRoleSelect = useCallback((selectedRole: "tourist" | "guide") => {
    setRole(selectedRole);
    setStep(2);
  }, []);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleEdit = useCallback((editStep: number) => {
    setStep(editStep);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step > 1) {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step, handleBack]);

  const progressPercentage = useMemo(() => (step / TOTAL_STEPS) * 100, [step]);

  return (
    <div className="flex flex-col items-center gap-3 md:gap-6 max-w-md mx-auto w-full py-4 md:py-8">
      {step > 1 && (
        <div className="w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <TbArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}
      <div className="w-full space-y-2">
        <div className="w-full flex gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="w-full text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Step {step} of {TOTAL_STEPS} ({Math.round(progressPercentage)}%)
          </p>
        </div>
      </div>

      {step === 1 && <RoleSelection onRoleSelect={handleRoleSelect} />}
      {step === 2 && (
        <PersonalInfo
          stepUp={handleNext}
          initialData={{
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            age: formData.age,
          }}
        />
      )}
      {step === 3 && (
        <AccountInfo
          stepUp={handleNext}
          initialData={{
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }}
        />
      )}
      {step === 4 && role === "tourist" && (
        <TravelDetails
          stepUp={handleNext}
          initialData={{
            country: formData.country,
            preferences: formData.preferences,
          }}
        />
      )}
      {step === 4 && role === "guide" && (
        <GuideDetails
          stepUp={handleNext}
          initialData={{
            location: formData.location,
            languages: formData.languages,
            experience: formData.experience,
          }}
        />
      )}
      {step === 5 && role && (
        <ProfilePreview
          stepUp={handleNext}
          onEdit={handleEdit}
          profileData={{
            role,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            age: formData.age,
            username: formData.username,
            country: formData.country,
            preferences: formData.preferences,
            location: formData.location,
            languages: formData.languages,
            experience: formData.experience,
          }}
        />
      )}
    </div>
  );
};

export default OnboardingFlow;
