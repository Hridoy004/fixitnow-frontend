/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

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

export const getCategories = async () => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["categories"],
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getCategoryById = async (categoryId: string) => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: [`category-${categoryId}`],
      },
    },
  );

  const result = await res.json();

  return result;
};
