"use server";

import { cookies } from "next/headers";

export const getAllUsers = async (page = 1, limit = 10) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
      data: [],
      meta: {
        page: 1,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?page=${page}&limit=${limit}`,
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
