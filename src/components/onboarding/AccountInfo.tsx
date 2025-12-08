// step 3 - common

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
import { TbArrowRight, TbCheck, TbX } from "react-icons/tb";
import { useState, useMemo } from "react";

interface StepProps {
  stepUp: (data: { username: string; password: string; confirmPassword: string }) => void;
  initialData?: { username: string; password: string; confirmPassword: string };
}

interface ValidationErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const AccountInfo = ({ stepUp, initialData }: StepProps) => {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    password: initialData?.password || "",
    confirmPassword: initialData?.confirmPassword || "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return { score: 0, label: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] };
  }, [formData.password]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (value.length < 3) return "Must be at least 3 characters";
        if (value.length > 20) return "Must be at most 20 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Only letters, numbers, and underscores";
        return undefined;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Must be at least 8 characters";
        if (!/[a-z]/.test(value)) return "Include a lowercase letter";
        if (!/[A-Z]/.test(value)) return "Include an uppercase letter";
        if (!/\d/.test(value)) return "Include a number";
        return undefined;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords don't match";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
    // Re-validate confirm password when password changes
    if (field === "password" && touched.confirmPassword) {
      const confirmError = formData.confirmPassword !== value ? "Passwords don't match" : undefined;
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const isFormValid = useMemo(() => {
    const hasAllFields = Object.values(formData).every(val => val.trim());
    const hasNoErrors = Object.values(errors).every(err => !err);
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
      setTouched({ username: true, password: true, confirmPassword: true });
      return;
    }

    stepUp(formData);
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
        <FieldGroup>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              onBlur={() => handleBlur("username")}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && touched.username && (
              <p id="username-error" className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error password-strength" : "password-strength"}
            />
            {errors.password && touched.password && (
              <p id="password-error" className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
            {formData.password && (
              <div id="password-strength" className="mt-2">
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
                  {passwordStrength.label && `Strength: ${passwordStrength.label}`}
                </p>
              </div>
            )}
          </Field>
          <Field>
            <Label htmlFor="confirmpassword">Confirm password</Label>
            <Input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmpassword-error" : undefined}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p id="confirmpassword-error" className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
            {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
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
