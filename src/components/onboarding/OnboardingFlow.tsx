"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import RoleSelection from "./RoleSelection";
import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";
import TravelDetails from "./TravelDetails";
import GuideDetails from "./GuideDetails";
import { ProfileData } from "@/schemas/onboarding.schema";
import ProfilePreview from "./ProfilePreview";
import { useAuth } from "@/context/AuthContext";

const OnboardingFlow = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOTAL_STEPS = 5;

  const handleNext = useCallback(
    (data?: Partial<ProfileData>) => {
      if (data && formData) {
        setFormData({ ...formData, ...data } as ProfileData);
      }

      if (step < TOTAL_STEPS) {
        setStep((prev) => prev + 1);
      }
    },
    [step, router, formData]
  );

  const handleSubmit = async () => {
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const result = await register(formData);

      if (result.success && result.user) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Registration failed");
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = useCallback(
    (selectedRole: "tourist" | "guide" | "admin") => {
      if (selectedRole === "admin") return;
      setFormData({
        role: selectedRole,
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        username: "",
        password: "",
        confirmPassword: "",
        ...(selectedRole === "tourist"
          ? { country: "", travelPreferences: [] }
          : { languages: [], yearsOfExp: 0 }),
      } as ProfileData);
      setStep(2);
    },
    []
  );

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setError(null);
    }
  }, [step]);

  const handleEdit = useCallback((editStep: number) => {
    setStep(editStep);
    setError(null);
  }, []);

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
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>
      </div>

      {step === 1 && <RoleSelection onRoleSelect={handleRoleSelect} />}
      {step === 2 && (
        <PersonalInfo
          stepUp={handleNext}
          initialData={
            formData
              ? {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  age: formData.age,
                }
              : undefined
          }
        />
      )}
      {step === 3 && (
        <AccountInfo
          stepUp={handleNext}
          initialData={
            formData
              ? {
                  username: formData.username,
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                }
              : undefined
          }
        />
      )}
      {step === 4 && formData?.role === "tourist" && (
        <TravelDetails
          stepUp={handleNext}
          initialData={
            formData && "travelPreferences" in formData
              ? {
                  country: formData.country,
                  travelPreferences: formData.travelPreferences,
                }
              : undefined
          }
        />
      )}
      {step === 4 && formData?.role === "guide" && (
        <GuideDetails
          stepUp={handleNext}
          initialData={
            formData && "languages" in formData
              ? {
                  languages: formData.languages,
                  yearsOfExp: formData.yearsOfExp,
                }
              : undefined
          }
        />
      )}
      {step === 5 && formData && (
        <ProfilePreview
          stepUp={handleSubmit}
          onEdit={handleEdit}
          profileData={formData}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default OnboardingFlow;
