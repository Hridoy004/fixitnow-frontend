"use server";

import { BookingStatus, IBooking } from "@/lib/types";
import { cookies } from "next/headers";

export type BookingsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetAllBookingsResponse = {
  success: boolean;
  message: string;
  data: IBooking[];
  meta: BookingsMeta;
};

export type BookingActionResponse = {
  success: boolean;
  message: string;
  data?: IBooking | null;
};

const getEmptyMeta = (page: number, limit: number): BookingsMeta => ({
  page,
  limit,
  total: 0,
  totalPages: 0,
});

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

export const getAllBookings = async (
  page = 1,
  limit = 10,
): Promise<GetAllBookingsResponse> => {
  const emptyMeta = getEmptyMeta(page, limit);

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
        meta: emptyMeta,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch bookings (status ${res.status})`,
        data: [],
        meta: emptyMeta,
      };
    }

    const json = await res.json();

    return {
      success: json.success ?? true,
      message: json.message ?? "Bookings retrieved successfully",
      data: json.data ?? [],
      meta: json.meta ?? emptyMeta,
    };
  } catch (error) {
    console.error("getAllBookings error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching bookings.",
      data: [],
      meta: emptyMeta,
    };
  }
};

export const getBookingById = async (
  bookingId: string,
): Promise<BookingActionResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch booking (status ${res.status})`,
        data: null,
      };
    }

    const json = await res.json();

    return {
      success: json.success ?? true,
      message: json.message ?? "Booking retrieved successfully",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("getBookingById error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching booking.",
      data: null,
    };
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
): Promise<BookingActionResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          status,
        }),
        cache: "no-store",
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message:
          json?.message ??
          `Failed to update booking status (status ${res.status})`,
        data: null,
      };
    }

    return {
      success: json?.success ?? true,
      message: json?.message ?? "Booking status updated successfully",
      data: json?.data ?? null,
    };
  } catch (error) {
    console.error("updateBookingStatus error:", error);

    return {
      success: false,
      message: "Something went wrong while updating booking status.",
      data: null,
    };
  }
};

export const cancelBooking = async (
  bookingId: string,
): Promise<BookingActionResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message:
          json?.message ?? `Failed to cancel booking (status ${res.status})`,
        data: null,
      };
    }

    return {
      success: json?.success ?? true,
      message: json?.message ?? "Booking cancelled successfully",
      data: json?.data ?? null,
    };
  } catch (error) {
    console.error("cancelBooking error:", error);

    return {
      success: false,
      message: "Something went wrong while cancelling booking.",
      data: null,
    };
  }
};
