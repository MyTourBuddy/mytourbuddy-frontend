import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SigninForm from "@/components/SigninForm";

const SigninPage = () => {
  return (
    <div className="max-w-lg w-full mx-auto py-4 md:py-8">
      <SigninForm />
    </div>
  );
};

export default SigninPage;
