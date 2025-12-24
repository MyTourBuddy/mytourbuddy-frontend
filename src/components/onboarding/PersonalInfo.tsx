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
import { useState } from "react";
import {
  PersonalInfoInput,
  personalInfoSchema,
} from "@/schemas/onboarding.schema";
import { z } from "zod";

interface PersonalInfoProps {
  stepUp: (data: PersonalInfoInput) => void;
  initialData?: PersonalInfoInput;
}

type ValidationErrors = Partial<Record<keyof PersonalInfoInput, string>>;

const PersonalInfo = ({ stepUp, initialData }: PersonalInfoProps) => {
  const [formData, setFormData] = useState<Partial<PersonalInfoInput>>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    age: initialData?.age || undefined,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    const result = personalInfoSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    } else {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((issue: z.ZodError["issues"][number]) => {
        const field = issue.path[0] as keyof PersonalInfoInput;
        formattedErrors[field] = issue.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleChange = (field: keyof PersonalInfoInput, value: string) => {
    const processedValue =
      field === "age" ? (value ? parseInt(value) : undefined) : value;
    setFormData({ ...formData, [field]: processedValue });

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      stepUp(formData as PersonalInfoInput);
    }
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
        <FieldGroup className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <Field>
              <Label htmlFor="firstName">First name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
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
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </Field>

          <Field>
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              min="1"
              max="120"
              value={formData.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              aria-invalid={!!errors.age}
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age}</p>
            )}
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
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
