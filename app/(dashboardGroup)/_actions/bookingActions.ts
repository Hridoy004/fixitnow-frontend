"use server";

import { IBooking } from "@/lib/types";
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

export const getAllBookings = async (
  page = 1,
  limit = 10,
): Promise<GetAllBookingsResponse> => {
  const emptyMeta: BookingsMeta = { page, limit, total: 0, totalPages: 0 };

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
        meta: emptyMeta,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/bookings?page=${page}&limit=${limit}`,
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
