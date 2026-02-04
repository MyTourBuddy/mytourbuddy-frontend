import { z } from "zod";

export const BuddyAiRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().min(1, "Age must be at least 1"),
  travelPrefs: z.array(z.string()).optional(),
  startLocation: z.string().min(1, "Start destination is required"),
  endDestination: z.string().min(1, "End destination is required"),
});

export const BuddyAiResponseSchema = z.object({
  generatedGuide: z.string().min(1, "Tour plan is required"),
});

export type BuddyAiRequest = z.infer<typeof BuddyAiRequestSchema>;
export type BuddyAiResponse = z.infer<typeof BuddyAiResponseSchema>;