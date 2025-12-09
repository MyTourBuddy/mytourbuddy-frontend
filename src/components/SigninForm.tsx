import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import img3 from "@/../public/img3.svg";
import { TbArrowRight } from "react-icons/tb";

const SigninForm = () => {
  const justValidation = () => {
    // redirect to dashboard if username = "admin" and password = "admin"
  };
  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3 flex flex-col items-center gap-2 md:gap-4">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4 relative mx-auto">
          <Image
            src={img3}
            alt="signin to mytourbuddy"
            fill
            className="object-contain"
            priority
          />
        </div>
        <CardTitle className="text-xl md:text-2xl">
          Sign in to MyTourBuddy
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="post" className="space-y-4">
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </Field>
          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full h-10 md:h-11 text-sm md:text-base group"
          >
            <span>Signin</span>
            <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          <span>Don&apos;t have an account?&nbsp;</span>

          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
