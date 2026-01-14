import { z } from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  touristId: z.string(),
  pkgId: z.string(),
  guideId: z.string(),
  totalPrice: z.number(),
  totalCount: z.number(),
  bookingStatus: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  bookingDate: z.date(),
  createdAt: z.date(),
  isReviewed: z.boolean().default(false),
});

export type Booking = z.infer<typeof bookingSchema>;
