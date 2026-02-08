import { getErrorMessage } from "@/helpers/get-error";
import { API_ENDPOINTS } from "@/services/api-config";
import { IOrder, IOrderPayload, TResult } from "@/types";
import { cookies } from "next/headers";

export const orderServices = {
  placeOrder: async (orderData: IOrderPayload): Promise<TResult<IOrder>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDERS;

      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to place order",
        };
      }

      return {
        success: true,
        message: "Order placed successfully",
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to place order",
      };
    }
  },
  getOrderById: async (orderId: string): Promise<TResult<IOrder>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDER_BY_ID(orderId);
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch order",
        };
      }
      return {
        success: true,
        message: "Order fetched successfully",
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch order",
      };
    }
  },
  getAllOrdersOfCustomer: async (): Promise<TResult<IOrder[]>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDERS;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders-customer"] },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch orders",
        };
      }
      return {
        success: true,
        message: "Orders fetched successfully",
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch orders",
      };
    }
  },
  getAllOrdersOfSeller: async (): Promise<TResult<IOrder[]>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDER_SELLER;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders-seller"] },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch orders",
        };
      }
      return {
        success: true,
        message: "Orders fetched successfully",
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch orders",
      };
    }
  },

  updateOrderStatus: async (
    orderId: string,
    status: string,
  ): Promise<TResult<IOrder>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDER_STATUS(orderId);
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to update order status",
        };
      }
      return {
        success: true,
        message: "Order status updated successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to update order status",
      };
    }
  },

  cancelOrder: async (orderId: string): Promise<TResult<IOrder>> => {
    try {
      const API_URL = API_ENDPOINTS.ORDER_CANCEL(orderId);
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to cancel order",
        };
      }
      return {
        success: true,
        message: "Order cancelled successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to cancel order",
      };
    }
  },
};
