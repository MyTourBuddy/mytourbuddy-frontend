"use client";

import SigninForm from "@/components/SigninForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
  // todo: make this better
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  return (
    <div className="max-w-lg w-full mx-auto py-4 md:py-8">
      <SigninForm />
    </div>
  );
};

export default SigninPage;
