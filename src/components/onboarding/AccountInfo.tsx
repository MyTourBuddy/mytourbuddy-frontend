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
import { useState, useMemo } from "react";
import {
  AccountInfoInput,
  accountInfoSchema,
} from "@/schemas/onboarding.schema";
import { z } from "zod";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "../ui/spinner";
import { useCheckUsername } from "@/hooks/useAuthQueries";

interface AccountInfoProps {
  stepUp: (data: AccountInfoInput) => void;
  initialData?: AccountInfoInput;
}

type ValidationErrors = Partial<Record<keyof AccountInfoInput, string>>;

const AccountInfo = ({ stepUp, initialData }: AccountInfoProps) => {
  const [formData, setFormData] = useState<Partial<AccountInfoInput>>({
    username: initialData?.username || "",
    password: initialData?.password || "",
    confirmPassword: initialData?.confirmPassword || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const debouncedUsername = useDebounce(formData.username || "", 500);

  const {
    data: usernameCheckData,
    isLoading: isCheckingUsername,
    error: usernameCheckError,
  } = useCheckUsername(
    debouncedUsername,
    debouncedUsername.length >= 8
  );

  const usernameAvailable = usernameCheckData?.available ?? null;
  const usernameMessage = usernameCheckData?.message || (usernameCheckError ? "Unable to verify username availability" : null);

  const passwordStrength = useMemo(() => {
    const pw = formData.password || "";
    if (!pw) return { score: 0, label: "" };

    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] };
  }, [formData.password]);

  const validateForm = () => {
    const result = accountInfoSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const formattedErrors: ValidationErrors = {};
    result.error.issues.forEach((issue: z.ZodError["issues"][number]) => {
      const field = issue.path[0] as keyof AccountInfoInput;
      formattedErrors[field] = issue.message;
    });
    setErrors(formattedErrors);
    return false;
  };

  const handleChange = (field: keyof AccountInfoInput, value: string) => {
    const processedValue = field === "username" ? value.toLowerCase() : value;
    setFormData({ ...formData, [field]: processedValue });

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.username &&
      formData.username.length >= 8 &&
      formData.password &&
      formData.confirmPassword &&
      !isCheckingUsername &&
      usernameAvailable === true &&
      Object.keys(errors).length === 0
    );
  }, [formData, errors, isCheckingUsername, usernameAvailable]);

  const handleSubmit = () => {
    if (validateForm()) {
      stepUp(formData as AccountInfoInput);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3">
        <CardTitle className="text-xl md:text-2xl">Account Info</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Create your account credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="flex flex-col gap-3">
          <Field>
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                aria-invalid={!!errors.username || usernameAvailable === false}
                className={
                  usernameAvailable === true
                    ? "border-green-500 pr-10"
                    : usernameAvailable === false
                    ? "border-red-500"
                    : ""
                }
              />
              {isCheckingUsername && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Spinner />
                </span>
              )}
              {usernameAvailable === true && !isCheckingUsername && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                  <TbCheck className="h-5 w-5" />
                </span>
              )}
            </div>
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
            {!errors.username && usernameMessage && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${usernameAvailable ? "text-green-500" : "text-red-500"}`}>
                {usernameAvailable && <TbCheck className="h-3 w-3" />} {usernameMessage}
              </p>
            )}
            {!errors.username && !usernameMessage && formData.username && formData.username.length < 8 && (
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters required
              </p>
            )}
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.score
                          ? passwordStrength.score === 1
                            ? "bg-red-500"
                            : passwordStrength.score === 2
                            ? "bg-orange-500"
                            : passwordStrength.score === 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {passwordStrength.label &&
                    `Strength: ${passwordStrength.label}`}
                </p>
              </div>
            )}
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword || ""}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {formData.confirmPassword &&
              !errors.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <TbCheck className="h-3 w-3" /> Passwords match
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

export default AccountInfo;
