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
        next: { tags: ["cart"] },
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

  deleteCartItem: async (medicineId: string): Promise<TResult> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/carts/item`;

      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ medicineId }),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to delete cart item.",
        };
      }
      return {
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to delete cart item.",
      };
    }
  },

  decrementCartItemQuantity: async (
    medicineId: string,
    quantity: number,
  ): Promise<TResult> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/carts/decrement/${medicineId}`;

      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ quantity }),
      });
      console.log("Response:", response);
      const result = await response.json();
      console.log("Result:", result);

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to decrement cart item quantity.",
        };
      }

      return { success: true, message: "Decremented successfully" };
    } catch (error) {
      console.error("Error in decrementCartItemQuantity:", error);
      return {
        success: false,
        message:
          getErrorMessage(error) || "Failed to decrement cart item quantity.",
      };
    }
  },
};
