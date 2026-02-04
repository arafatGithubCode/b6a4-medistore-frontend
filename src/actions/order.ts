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
};

export const getOrderByIdAction = async (
  orderId: string,
): Promise<TResult<IOrder>> => {
  try {
    const { message, success, data } =
      await orderServices.getOrderById(orderId);
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while fetching the order.",
    };
  }
};

export const getAllOrdersOfCustomerAction = async (): Promise<
  TResult<IOrder[]>
> => {
  try {
    const { message, success, data, pagination } =
      await orderServices.getAllOrdersOfCustomer();
    return { success, message, data, pagination };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while fetching orders.",
    };
  }
};

export const getAllOrdersOfSellerAction = async (): Promise<
  TResult<IOrder[]>
> => {
  try {
    const { message, success, data, pagination } =
      await orderServices.getAllOrdersOfSeller();
    return { success, message, data, pagination };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while fetching orders.",
    };
  }
};
