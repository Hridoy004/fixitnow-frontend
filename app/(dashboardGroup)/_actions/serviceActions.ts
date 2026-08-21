"use server";

import { cookies } from "next/headers";

export interface IServicePayload {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}

export const createService = async (data: IServicePayload) => {
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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          json.message ?? `Failed to create service (status ${res.status})`,
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Service created successfully.",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("createService error:", error);

    return {
      success: false,
      message: "Something went wrong while creating service.",
      data: null,
    };
  }
};

export const updateService = async (
  serviceId: string,
  data: IServicePayload,
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
      `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          json.message ?? `Failed to update service (status ${res.status})`,
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Service updated successfully.",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("updateService error:", error);

    return {
      success: false,
      message: "Something went wrong while updating service.",
      data: null,
    };
  }
};

export const deleteService = async (serviceId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
      {
        method: "DELETE",
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
        message:
          json.message ?? `Failed to delete service (status ${res.status})`,
        data: null,
      };
    }

    return {
      success: json.success ?? true,
      message: json.message ?? "Service deleted successfully.",
      data: json.data ?? null,
    };
  } catch (error) {
    console.error("deleteService error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting service.",
      data: null,
    };
  }
};
