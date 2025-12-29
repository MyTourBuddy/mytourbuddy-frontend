"use client";

import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupPage = () => {
  // todo: make this better
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);
  return (
    <div className="max-w-xl w-full mx-auto">
      <OnboardingFlow />
    </div>
  );
};

export default SignupPage;
