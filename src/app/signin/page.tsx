"use client";

import SigninForm from "@/components/SigninForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
  // todo: make this better
  // const { isAuthenticated, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [loading, isAuthenticated, router]);

  return (
    <section className="max-w-md w-full mx-auto navbar-offset flex items-center justify-center px-4">
      <SigninForm />
    </section>
  );
};

export default SigninPage;
