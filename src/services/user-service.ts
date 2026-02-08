import { getErrorMessage } from "@/helpers/get-error";
import { API_ENDPOINTS } from "@/services/api-config";
import { TResult } from "@/types/return-type";
import { Session, User } from "@/types/session-type";
import { cookies } from "next/headers";

export const userServices = {
  getUserSession: async (): Promise<
    TResult<{ session: Session; user: User }>
  > => {
    const API_URL = API_ENDPOINTS.USER_SESSION;
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

  updateUserById: async (
    userId: string,
    updateData: Partial<User>,
  ): Promise<TResult<User>> => {
    try {
      const API_URL = API_ENDPOINTS.USER_BY_ID(userId);
      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to update user",
        };
      }
      return {
        success: true,
        message: "User updated successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to update your profile",
      };
    }
  },

  getAllUsers: async (): Promise<TResult<User[]>> => {
    try {
      const API_URL = API_ENDPOINTS.USERS;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["users"] },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch users",
        };
      }
      return {
        success: true,
        message: "Users fetched successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch users",
      };
    }
  },

  deleteUserById: async (userId: string): Promise<TResult<null>> => {
    try {
      const API_URL = API_ENDPOINTS.USER_BY_ID(userId);
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to delete user",
        };
      }
      return {
        success: true,
        message: "User deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to delete user",
      };
    }
  },
};
