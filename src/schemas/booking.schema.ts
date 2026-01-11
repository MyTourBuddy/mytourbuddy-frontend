import { z } from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  touristId: z.string(),
  pkgId: z.string(),
  totalPrice: z.number(),
  bookingStatus: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  bookingDate: z.date(),
  createdAt: z.date(),
});

export type Booking = z.infer<typeof bookingSchema>;
