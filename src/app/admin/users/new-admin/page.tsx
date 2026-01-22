"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useCheckEmail,
  useCheckUsername,
  useRegisterAdmin,
  useCurrentUser,
} from "@/hooks/useAuthQueries";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useMemo } from "react";
import { TbCheck } from "react-icons/tb";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateAdminPage = () => {
  const router = useRouter();
  const registerAdmin = useRegisterAdmin();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const debouncedEmail = useDebounce(email, 500);
  const debouncedUsername = useDebounce(username, 500);

  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  const isValidEmailFormat = emailRegex.test(debouncedEmail);

  const {
    data: emailCheck,
    isLoading: emailLoading,
    error: emailCheckError,
  } = useCheckEmail(debouncedEmail, isValidEmailFormat);
  const {
    data: usernameCheck,
    isLoading: usernameLoading,
    error: usernameCheckError,
  } = useCheckUsername(debouncedUsername, debouncedUsername.length >= 8);

  const emailAvailable = emailCheck?.available ?? null;
  const emailMessage =
    emailCheck?.message ||
    (emailCheckError ? "Unable to verify email availability" : null);
  const emailError =
    email && !emailRegex.test(email) ? "Invalid email format" : null;
  const usernameAvailable = usernameCheck?.available ?? null;
  const usernameMessage =
    usernameCheck?.message ||
    (usernameCheckError ? "Unable to verify username availability" : null);

  const passwordStrength = useMemo(() => {
    const pw = password || "";
    if (!pw) return { score: 0, label: "" };

    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] };
  }, [password]);

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    age &&
    password.length >= 8 &&
    emailAvailable === true &&
    usernameAvailable === true;

  // Check if user is admin
  if (userLoading) {
    return (
      <section className="max-w-5xl mx-auto w-full pt-3 px-4">
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner />
        </div>
      </section>
    );
  }

  if (!currentUser || currentUser.role !== "ADMIN") {
    router.push("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      alert(
        "Please fill all fields and ensure email and username are available",
      );
      return;
    }

    try {
      const adminData = {
        role: "ADMIN" as const,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        age: parseInt(age),
        username: username.trim(),
        password,
      };

      await registerAdmin.mutateAsync(adminData);

      toast.success("Admin account created successfully!");
      router.push("/admin/users");
    } catch (error) {
      // Error is already handled by the hook
      console.error("Failed to create admin:", error);
    }
  };
  return (
    <section className="max-w-5xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">Create New Admin</h1>

        <form className="max-w-md" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup className="flex flex-col gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Field>
                  <FieldLabel htmlFor="firstName">FirstName</FieldLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">LastName</FieldLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup
                  className={
                    emailError
                      ? "border-red-500"
                      : emailAvailable === true
                        ? "border-green-500"
                        : emailAvailable === false
                          ? "border-red-500"
                          : ""
                  }
                >
                  <InputGroupInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    {emailLoading && <Spinner />}
                    {emailAvailable === true && !emailLoading && (
                      <TbCheck className="h-5 w-5 text-green-500" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                {emailError ? (
                  <p className="text-xs mt-1 text-red-500">{emailError}</p>
                ) : emailMessage ? (
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${emailAvailable ? "text-green-500" : "text-red-500"}`}
                  >
                    {emailAvailable && <TbCheck className="h-3 w-3" />}{" "}
                    {emailMessage}
                  </p>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="age">Age</FieldLabel>
                <Input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <InputGroup
                  className={
                    usernameAvailable === true
                      ? "border-green-500"
                      : usernameAvailable === false
                        ? "border-red-500"
                        : ""
                  }
                >
                  <InputGroupInput
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  />
                  <InputGroupAddon align="inline-end">
                    {usernameLoading && <Spinner />}
                    {usernameAvailable === true && !usernameLoading && (
                      <TbCheck className="h-5 w-5 text-green-500" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                {usernameMessage && (
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${usernameAvailable ? "text-green-500" : "text-red-500"}`}
                  >
                    {usernameAvailable && <TbCheck className="h-3 w-3" />}{" "}
                    {usernameMessage}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
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
            </FieldGroup>
            <Button
              type="submit"
              disabled={!isFormValid || registerAdmin.isPending}
            >
              {registerAdmin.isPending ? "Creating..." : "Create"}
            </Button>
          </FieldSet>
        </form>
      </div>
    </section>
  );
};

export default CreateAdminPage;
