import { env } from "@/env";
import { getErrorMessage } from "@/helpers/get-error";
import { ICart, TResult } from "@/types";
import { cookies } from "next/headers";

export const cartService = {
  addToCart: async (item: {
    medicineId: string;
    quantity: number;
  }): Promise<TResult> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/carts/`;
      const items = {
        items: [
          {
            medicineId: item.medicineId,
            quantity: item.quantity,
          },
        ],
      };

      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["cart"] },
        body: JSON.stringify(items),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to add item to cart.",
        };
      }

      return {
        success: result.success,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add item to cart.",
      };
    }
  },

  getCurrentUserCart: async (): Promise<TResult<ICart>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/carts/`;

      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch cart.",
        };
      }
      return {
        success: result.success,
        message: result.message,
        data: result.data[0],
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch cart.",
      };
    }
  },
};
