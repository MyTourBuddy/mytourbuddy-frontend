"use client";

import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupPage = () => {
  // todo: make this better
  // const { isAuthenticated, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [loading, isAuthenticated, router]);
  return (
    <section className="max-w-md mx-auto navbar-offset flex items-center justify-center w-full">
      <OnboardingFlow />
    </section>
  );
};

export default SignupPage;
