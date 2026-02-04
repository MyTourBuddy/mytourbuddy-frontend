import { z } from "zod";

export const baseUserSchema = z.object({
  id: z.string(),
  role: z.enum(["TOURIST", "GUIDE", "ADMIN"]),

  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  username: z.string(),
  password: z.string().min(8),
  age: z.number().min(1).max(120),
  avatar: z.string().optional(),
  phone: z.string(),
  isProfileComplete: z.boolean().default(false),
  memberSince: z.string(),
});

export const touristSchema = baseUserSchema.extend({
  role: z.literal("TOURIST"),

  country: z.string(),
  travelPreferences: z.array(z.string()),
  languagesSpoken: z.array(z.string()).optional(),
});

export const guideSchema = baseUserSchema.extend({
  role: z.literal("GUIDE"),

  languages: z.array(z.string()),
  yearsOfExp: z.number().min(0),
  bio: z.string().optional(),
  specializations: z.array(z.string()),
  certifications: z.array(z.string()).optional(),
  emergencyContact: z.string(),
  website: z.string().optional(),
  socialMedia: z.array(z.string()).optional(),
  isVerified: z.boolean(),
});

export const adminSchema = baseUserSchema.extend({
  role: z.literal("ADMIN"),
});

export const userSchema = z.discriminatedUnion("role", [
  touristSchema,
  guideSchema,
  adminSchema,
]);

export type BaseUser = z.infer<typeof baseUserSchema>;
export type Tourist = z.infer<typeof touristSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Admin = z.infer<typeof adminSchema>;
export type User = Tourist | Guide | Admin;
