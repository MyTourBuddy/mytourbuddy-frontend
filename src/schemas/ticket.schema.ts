import { z } from "zod";

export const supportTicketSchema = z.object({
  id: z.string(),
  userId: z.string(),
  subject: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "CLOSED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  closedByAdminId: z.string().optional(),
  adminResponse: z.string().optional(),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;
