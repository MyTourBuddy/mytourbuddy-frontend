import { z } from "zod";

export const roleSelectionSchema = z.object({
  role: z.enum(["TOURIST", "GUIDE", "ADMIN"]),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Please enter a valid email"),
  age: z.number().min(12, "Must be at least 12 years old").max(150, "Age must be less than 150"),
});

export const accountInfoSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username is required")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores allowed"
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^a-zA-Z0-9]/, "Must contain special character"),
    confirmPassword: z
      .string("Password is required")
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const guideDetailsSchema = z.object({
  languages: z.array(z.string()).min(1, "Select at least 1 language"),
  yearsOfExp: z.number().min(0),
});

export const touristDetailsSchema = z.object({
  country: z.string().min(1, "Country is required"),
  travelPreferences: z.array(z.string()).min(1, "Select at least one travel preference"),
});

export type RoleSelectionInput = z.infer<typeof roleSelectionSchema>;
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type AccountInfoInput = z.infer<typeof accountInfoSchema>;
export type GuideDetailsInput = z.infer<typeof guideDetailsSchema>;
export type TouristDetailsInput = z.infer<typeof touristDetailsSchema>;

export type TouristProfile = RoleSelectionInput &
  PersonalInfoInput &
  AccountInfoInput &
  TouristDetailsInput;
export type GuideProfile = RoleSelectionInput &
  PersonalInfoInput &
  AccountInfoInput &
  GuideDetailsInput;

export type ProfileData = TouristProfile | GuideProfile;
