import { z } from "zod";

export const packageSchema = z.object({
  id: z.string(),
  username: z.string(),

  title: z.string().min(10, "Title should be descriptive").max(100),
  description: z.string().min(100, "Provide a detailed description"),
  price: z.number().positive("Price must be greater than 0"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  image: z.string().optional(),

  included: z.array(z.string()),
  notIncluded: z.array(z.string()).optional(),
  note: z.string().optional(),
  createdAt: z.date(),
});

export type Package = z.infer<typeof packageSchema>;
