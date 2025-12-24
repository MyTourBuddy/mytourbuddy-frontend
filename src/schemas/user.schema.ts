import { z } from "zod";

const baseUserSchema = z.object({
  id: z.string(),
  role: z.enum(["tourist", "guide"]),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  age: z.number().min(1).max(120),
  username: z.string(),
  password: z.string().min(8),
  avatar: z.string(),
  memberSince: z.string(),
  phone: z.string(),
  isProfileComplete: z.boolean().default(false),
});

const touristSchema = baseUserSchema.extend({
  role: z.literal("tourist"),
  country: z.string(),
  travelPreferences: z.array(z.string()),
  preferredDestinations: z.array(z.string()).optional(),
  travelInterests: z.array(z.string()).optional(),
  languagesSpoken: z.array(z.string()).optional(),
});

const guideSchema = baseUserSchema.extend({
  role: z.literal("guide"),
  languages: z.array(z.string()),
  yearsOfExp: z.number().min(0),
  bio: z.string().optional(),
  specializations: z.array(z.string()),
  certifications: z.string().optional(),
  dailyRate: z.number().min(0),
  maxGroupSize: z.number().min(1),
  transportMode: z.string(),
  ageGroups: z.array(z.string()),
  workingDays: z.array(z.string()),
  emergencyContact: z.string().optional(),
  website: z.string().optional(),
  socialMedia: z.array(z.string()).optional(),
});

export const userSchema = z.discriminatedUnion("role", [
  touristSchema,
  guideSchema,
]);

export type User = z.infer<typeof baseUserSchema>;
export type Tourist = z.infer<typeof touristSchema>;
export type Guide = z.infer<typeof guideSchema>;
