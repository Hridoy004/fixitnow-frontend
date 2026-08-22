/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { ICategory } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

type CategoryState = {
  success: boolean;
  message: string;
  data?: Record<string, any>;
};

export const createCategory = async (
  prevState: CategoryState | null,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("categories", {
      expire: 0,
    });
  }

  return result;
};

export const updateCategory = async (
  categoryId: string,
  prevState: CategoryState | null,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name") ?? "",
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("categories", {
      expire: 0,
    });
  }

  return result;
};

export const deleteCategory = async (categoryId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("categories", {
      expire: 0,
    });
  }

  return result;
};

export const getPublicCategories = async (): Promise<{
  success: boolean;
  message: string;
  data: ICategory[];
}> => {
  try {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["public-categories"],
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message ?? `Failed to fetch categories (status ${res.status})`,
        data: [],
      };
    }

    return {
      success: result.success ?? true,
      message: result.message ?? "Categories retrieved successfully.",
      data: result.data ?? [],
    };
  } catch (error) {
    console.error("getPublicCategories error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching categories.",
      data: [],
    };
  }
};

export const getCategories = async () => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
      data: [],
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  return res.json();
};
