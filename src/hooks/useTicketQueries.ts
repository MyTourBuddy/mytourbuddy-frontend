import { apiClient, getErrorMessage } from "@/lib/api/client";
import { SupportTicket } from "@/schemas/ticket.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type CreateTicketData = Omit<
  SupportTicket,
  | "id"
  | "userId"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "closedByAdminId"
  | "adminResponse"
>;

type CloseTicketData = {
  ticketId: string;
  adminResponse: string;
};

export const ticketKeys = {
  all: ["tickets"] as const,
  lists: () => [...ticketKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...ticketKeys.lists(), { filters }] as const,
  details: () => [...ticketKeys.all, "detail"] as const,
  detail: (id: string) => [...ticketKeys.details(), id] as const,
  allTickets: () => [...ticketKeys.lists(), "all"] as const,
};

// Get tickets for current user
export function useTickets() {
  return useQuery({
    queryKey: ticketKeys.lists(),
    queryFn: async () => {
      return await apiClient<SupportTicket[]>("tickets");
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// Get all tickets (for admins)
export function useAllTickets() {
  return useQuery({
    queryKey: ticketKeys.allTickets(),
    queryFn: async () => {
      return await apiClient<SupportTicket[]>("tickets/all");
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// Get ticket by id
export function useTicket(ticketId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ticketKeys.detail(ticketId),
    queryFn: async () => {
      return await apiClient<SupportTicket>(`tickets/${ticketId}`);
    },
    enabled: enabled && !!ticketId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// Create ticket
export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketData: CreateTicketData) => {
      return await apiClient<SupportTicket>("tickets", {
        method: "POST",
        body: JSON.stringify(ticketData),
      });
    },
    onSuccess: (newTicket) => {
      // Update cache
      queryClient.setQueryData(ticketKeys.detail(newTicket.id), newTicket);
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() });

      toast.success("Support ticket created successfully");
    },
    onError: (error) => {
      console.error("Create ticket failed:", getErrorMessage(error));
      toast.error("Failed to create support ticket");
    },
  });
}

// Close ticket (for admins)
export function useCloseTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, adminResponse }: CloseTicketData) => {
      return await apiClient<SupportTicket>(`tickets/${ticketId}`, {
        method: "PUT",
        body: JSON.stringify({ adminResponse }),
      });
    },
    onSuccess: (updatedTicket, { ticketId }) => {
      // Update cache
      queryClient.setQueryData(ticketKeys.detail(ticketId), updatedTicket);
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ticketKeys.allTickets() });

      toast.success("Ticket closed successfully");
    },
    onError: (error) => {
      console.error("Close ticket failed:", getErrorMessage(error));
      toast.error("Failed to close ticket");
    },
  });
}
