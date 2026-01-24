import { apiClient, getErrorMessage } from "@/lib/api/client";
import { Booking } from "@/schemas/booking.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) =>
    [...bookingKeys.lists(), { filters }] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
  my: () => [...bookingKeys.all, "my"] as const,
  guide: () => [...bookingKeys.all, "guide"] as const,
};

// get all bookings
export function useBookings() {
  return useQuery({
    queryKey: bookingKeys.lists(),
    queryFn: async () => {
      return await apiClient<Booking[]>("bookings");
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// get tourists bookings
export function useMyBookings() {
  return useQuery({
    queryKey: bookingKeys.my(),
    queryFn: async () => {
      return await apiClient<Booking[]>("bookings/my");
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// get guide bookings
export function useGuideBookings() {
  return useQuery({
    queryKey: bookingKeys.guide(),
    queryFn: async () => {
      return await apiClient<Booking[]>("bookings/guide");
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// get booking by id
export function useBooking(bookingId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: async () => {
      return await apiClient<Booking>(`bookings/${bookingId}`);
    },
    enabled: enabled && !!bookingId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// create booking
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: {
      pkgId: string;
      totalPrice: number;
      bookingDate: string;
      totalCount: number;
    }) => {
      const result = await apiClient<Booking>("bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      
      if (result === null) {
        throw new Error("Duplicate booking detected. You already have a pending booking for this package.");
      }
      
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: bookingKeys.my() });
    },
    onError: (error) => {
      console.warn("Booking creation failed:", getErrorMessage(error));
    },
  });
}

// update bookings
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      bookingData,
    }: {
      bookingId: string;
      bookingData: Partial<Booking>;
    }) => {
      return await apiClient<Booking>(`bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify(bookingData),
      });
    },
    onSuccess: async (updatedBooking, variables) => {
      queryClient.setQueryData(
        bookingKeys.detail(variables.bookingId),
        updatedBooking
      );
      await queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: bookingKeys.my() });
      await queryClient.invalidateQueries({ queryKey: bookingKeys.guide() });
    },
    onError: (error) => {
      // Log for debugging - this helps track booking update failures
      console.warn("Booking update failed:", getErrorMessage(error));
    },
  });
}
