import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string(),
  guideId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  experiencedAt: z.date(),
  createdAt: z.date(),
});

export type Experience = z.infer<typeof experienceSchema>;
