import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  guideId: z.string(),
  touristId: z.string(),
  bookingId: z.string(),
  message: z.string().min(1, "Message is required"),
  rating: z.number(),
  createdAt: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
