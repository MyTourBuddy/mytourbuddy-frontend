// step 2 - common

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbArrowRight } from "react-icons/tb";
import { useState, useMemo } from "react";

interface StepProps {
  stepUp: (data: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
  }) => void;
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
  };
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
}

const PersonalInfo = ({ stepUp, initialData }: StepProps) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    age: initialData?.age || "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Only letters allowed";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return undefined;
      case "age":
        if (!value) return "Age is required";
        const ageNum = parseInt(value);
        if (isNaN(ageNum) || ageNum < 13)
          return "Must be at least 13 years old";
        if (ageNum > 120) return "Please enter a valid age";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(
      field,
      formData[field as keyof typeof formData]
    );
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const isFormValid = useMemo(() => {
    const hasAllFields = Object.values(formData).every((val) => val.trim());
    const hasNoErrors = Object.values(errors).every((err) => !err);
    return hasAllFields && hasNoErrors;
  }, [formData, errors]);

  const handleSubmit = () => {
    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof ValidationErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ firstName: true, lastName: true, email: true, age: true });
      return;
    }

    stepUp(formData);
  };
  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3">
        <CardTitle className="text-xl md:text-2xl">Personal Info</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Tell us about yourself
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="flex flex-col gap3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <Field>
              <Label htmlFor="fname">First name</Label>
              <Input
                type="text"
                id="fname"
                name="fname"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "fname-error" : undefined}
              />
              {errors.firstName && touched.firstName && (
                <p id="fname-error" className="text-xs text-red-500 mt-1">
                  {errors.firstName}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="lname">Last name</Label>
              <Input
                type="text"
                id="lname"
                name="lname"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lname-error" : undefined}
              />
              {errors.lastName && touched.lastName && (
                <p id="lname-error" className="text-xs text-red-500 mt-1">
                  {errors.lastName}
                </p>
              )}
            </Field>
          </div>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && touched.email && (
              <p id="email-error" className="text-xs text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </Field>
          <Field>
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              min="13"
              max="120"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              onBlur={() => handleBlur("age")}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
            />
            {errors.age && touched.age && (
              <p id="age-error" className="text-xs text-red-500 mt-1">
                {errors.age}
              </p>
            )}
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full h-10 md:h-11 text-sm md:text-base group"
        >
          <span>Next</span>
          <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalInfo;
