"use server";

import { ITechnician } from "@/lib/types";
import { cookies } from "next/headers";

export type TechniciansMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetAllTechniciansResponse = {
  success: boolean;
  message: string;
  data: ITechnician[];
  meta: TechniciansMeta;
};

const emptyMeta: TechniciansMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export const getAllTechnicians = async (
  sortBy = "hourlyRate",
  sortOrder: "asc" | "desc" = "asc",
): Promise<GetAllTechniciansResponse> => {
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
      `${process.env.BACKEND_API_URL}/api/technicians?sortBy=${sortBy}&sortOrder=${sortOrder}`,
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
        message: `Failed to fetch technicians (status ${res.status})`,
        data: [],
        meta: emptyMeta,
      };
    }

    const json = await res.json();

    return {
      success: json.success ?? true,
      message: json.message ?? "Technicians retrieved successfully",
      data: json.data ?? [],
      meta: json.meta ?? emptyMeta,
    };
  } catch (error) {
    console.error("getAllTechnicians error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching technicians.",
      data: [],
      meta: emptyMeta,
    };
  }
};
