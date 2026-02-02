"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { orderServices } from "@/services/order-service";
import { IOrder, TResult } from "@/types";

export const placeOrderAction = async (
  orderData: any,
): Promise<TResult<IOrder>> => {
  try {
    const { message, success, data } =
      await orderServices.placeOrder(orderData);

    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while placing the order.",
    };
  }

  return { success: true, message: "Order placed successfully" };
};
