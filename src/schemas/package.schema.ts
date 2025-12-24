import { z } from "zod";

export const packageSchema = z.object({
  id: z.string(),
  guideId: z.string(),

  title: z.string().min(10, "Title should be descriptive").max(100),
  description: z.string().min(100, "Provide a detailed description"),
  price: z.number().positive("Price must be greater than 0"),

  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  image: z.string().optional(),

  maxGroupSize: z.number().int().positive().optional(),

  included: z.array(z.string()).min(1, "At least one included item required"),
  notIncluded: z.array(z.string()).optional(),
  note: z.string().optional(),

  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),

  createdAt: z.date(),
});

export type Package = z.infer<typeof packageSchema>;
