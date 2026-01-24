import { z } from "zod";

export const adminRoleSchema = z.object({
  role: z.literal("ADMIN"),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Please enter a valid email"),
  age: z
    .number()
    .min(12, "Must be at least 12 years old")
    .max(150, "Age must be less than 150"),
});

export const adminAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Username is required")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^a-zA-Z0-9]/, "Must contain special character"),
});

export type AdminRoleInput = z.infer<typeof adminRoleSchema>;
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type AdminAccountInput = z.infer<typeof adminAccountSchema>;

export type AdminProfile = AdminRoleInput &
  PersonalInfoInput &
  AdminAccountInput;
