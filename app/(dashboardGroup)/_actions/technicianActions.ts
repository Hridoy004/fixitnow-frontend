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

export const getTechnicianById = async (
  technicianId: string,
): Promise<{
  success: boolean;
  message: string;
  data: ITechnician | null;
}> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technicians/${technicianId}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message ?? "Failed to fetch technician",
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Technician retrieved successfully",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("getTechnicianById error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching technician.",
      data: null,
    };
  }
};

export type UpdateTechnicianProfilePayload = {
  bio: string;
  experience: number;
  location: string;
  hourlyRate: number;
};

export const updateTechnicianProfile = async (
  payload: UpdateTechnicianProfilePayload,
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technicians/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message ?? "Failed to update technician profile",
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Technician profile updated successfully",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("updateTechnicianProfile error:", error);

    return {
      success: false,
      message: "Something went wrong while updating profile.",
      data: null,
    };
  }
};

export const updateTechnicianAvailability = async (isAvailable: boolean) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technicians/availability`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          isAvailable,
        }),
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message ?? "Failed to update availability",
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Availability updated successfully",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("updateTechnicianAvailability error:", error);

    return {
      success: false,
      message: "Something went wrong while updating availability.",
      data: null,
    };
  }
};
