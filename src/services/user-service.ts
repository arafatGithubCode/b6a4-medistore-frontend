import { env } from "@/env";
import { TResult } from "@/types/return-type";
import { Session, User } from "@/types/session-type";
import { cookies } from "next/headers";

export const userServices = {
  getUserSession: async (): Promise<
    TResult<{ session: Session; user: User }>
  > => {
    const API_URL = `${env.BACKEND_URL}/api/auth/get-session`;
    const cookieStore = await cookies();

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const result = await response.json();

    if (!result) {
      return {
        success: false,
        message: "Failed to fetch user session",
      };
    }

    return {
      success: true,
      message: "User session fetched successfully",
      data: result,
    };
  },
};
