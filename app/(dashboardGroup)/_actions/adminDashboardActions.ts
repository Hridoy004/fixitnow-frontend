/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { IDashboardStats } from "@/lib/types";
import { getAllBookingsForAdmin } from "./bookingActions";
import { getAllTechnicians } from "./technicianActions";
import { getAllUsers } from "./userActions";

export type GetDashboardStatsResponse = {
  success: boolean;
  message: string;
  data: IDashboardStats;
};

const emptyStats: IDashboardStats = {
  totalBookings: 0,
  totalRevenue: 0,
  totalUsers: 0,
  totalTechnicians: 0,
  bookingsThisMonth: 0,
  revenueThisMonth: 0,
};

export const getDashboardStats =
  async (): Promise<GetDashboardStatsResponse> => {
    try {
      const [bookingsRes, usersRes, techniciansRes] = await Promise.all([
        getAllBookingsForAdmin(1, 100),
        getAllUsers(1, 100),
        getAllTechnicians(),
      ]);

      if (
        !bookingsRes.success &&
        !usersRes.success &&
        !techniciansRes.success
      ) {
        return {
          success: false,
          message:
            bookingsRes.message || usersRes.message || techniciansRes.message,
          data: emptyStats,
        };
      }

      const totalRevenue = bookingsRes.success
        ? bookingsRes.data.reduce(
            (sum: any, booking: { totalAmount: any }) =>
              sum + booking.totalAmount,
            0,
          )
        : 0;

      return {
        success: true,
        message: "Stats retrieved successfully",
        data: {
          ...emptyStats,
          totalBookings: bookingsRes.success ? bookingsRes.meta.total : 0,
          totalRevenue,
          totalUsers: usersRes.success ? usersRes.meta.total : 0,
          totalTechnicians: techniciansRes.success
            ? techniciansRes.meta.total
            : 0,
        },
      };
    } catch (error) {
      console.error("getDashboardStats error:", error);

      return {
        success: false,
        message: "Something went wrong while fetching dashboard stats.",
        data: emptyStats,
      };
    }
  };
