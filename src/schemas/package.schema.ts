import { z } from "zod";

export const packageSchema = z.object({
  id: z.string(),
  guideId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number(),
  duration: z.string(),
  location: z.string(),
  image: z.string().optional(),
});

export type Package = z.infer<typeof packageSchema>;
