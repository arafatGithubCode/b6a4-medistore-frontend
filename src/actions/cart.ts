"use server";

import { cartService } from "@/services/cart-service";
import { TResult } from "@/types/return-type";

export const addToCartAction = async (item: {
  medicineId: string;
  quantity: number;
}): Promise<TResult> => {
  try {
    const { success, message, data } = await cartService.addToCart(item);
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while adding to cart.",
    };
  }
};
