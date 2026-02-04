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
import { TbArrowRight, TbCheck } from "react-icons/tb";
import { useMemo, useState } from "react";
import {
  PersonalInfoInput,
  personalInfoSchema,
} from "@/schemas/onboarding.schema";
import { z } from "zod";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "../ui/spinner";
import { useCheckEmail } from "@/hooks/useAuthQueries";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

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
  const debouncedEmail = useDebounce(formData.email || "", 500);

  const {
    data: emailCheckData,
    isLoading: isCheckingEmail,
    error: emailCheckError,
  } = useCheckEmail(
    debouncedEmail,
    debouncedEmail.length > 0 && debouncedEmail.includes("@")
  );

  const emailAvailable = emailCheckData?.available ?? null;
  const emailMessage = emailCheckData?.message || (emailCheckError ? "Unable to verify email availability" : null);

  const validateForm = () => {
    const result = personalInfoSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const formattedErrors: ValidationErrors = {};
    result.error.issues.forEach((issue: z.ZodError["issues"][number]) => {
      const field = issue.path[0] as keyof PersonalInfoInput;
      formattedErrors[field] = issue.message;
    });
    setErrors(formattedErrors);
    return false;
  };

  const handleChange = (field: keyof PersonalInfoInput, value: string) => {
    const processedValue =
      field === "age" ? (value ? parseInt(value) : undefined) : value;
    setFormData({ ...formData, [field]: processedValue });

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleBlur = (field: keyof PersonalInfoInput) => {
    if ((field === "firstName" || field === "lastName") && formData[field]) {
      setFormData({ ...formData, [field]: capitalizeFirstLetter(formData[field] as string) });
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.age &&
      formData.age >= 12 &&
      !isCheckingEmail &&
      emailAvailable === true &&
      Object.keys(errors).length === 0
    );
  }, [formData, errors, isCheckingEmail, emailAvailable]);

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
                onBlur={() => handleBlur("firstName")}
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
                onBlur={() => handleBlur("lastName")}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </Field>
          </div>

          <Field>
            <Label htmlFor="email">Email</Label>
            <InputGroup className={
              emailAvailable === true
                ? "border-green-500"
                : emailAvailable === false
                ? "border-red-500"
                : ""
            }>
              <InputGroupInput
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={!!errors.email || emailAvailable === false}
              />
              <InputGroupAddon align="inline-end">
                {isCheckingEmail && <Spinner />}
                {emailAvailable === true && !isCheckingEmail && <TbCheck className="h-5 w-5 text-green-500" />}
              </InputGroupAddon>
            </InputGroup>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
            {!errors.email && emailMessage && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${emailAvailable ? "text-green-500" : "text-red-500"}`}>
                {emailAvailable && <TbCheck className="h-3 w-3" />} {emailMessage}
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
              min="12"
              max="150"
              value={formData.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              aria-invalid={!!errors.age}
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age}</p>
            )}
            {!errors.age && formData.age && formData.age < 12 && (
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 12 years old
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
