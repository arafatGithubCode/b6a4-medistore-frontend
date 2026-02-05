"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { cartService } from "@/services/cart-service";
import { ICart } from "@/types";
import { TResult } from "@/types/return-type";
import { revalidateTag } from "next/cache";

export const addToCartAction = async (item: {
  medicineId: string;
  quantity: number;
}): Promise<TResult> => {
  try {
    const { success, message, data } = await cartService.addToCart(item);
    revalidateTag("cart", "max");
    revalidateTag("medicines", "max");
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while adding to cart.",
    };
  }
};

export const getCurrentUserCartAction = async (): Promise<TResult<ICart>> => {
  try {
    const { success, message, data } = await cartService.getCurrentUserCart();
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) || "An error occurred while fetching the cart.",
    };
  }
};

export const deleteCartItemAction = async (
  medicineId: string,
): Promise<TResult> => {
  try {
    const { success, message, data } =
      await cartService.deleteCartItem(medicineId);

    revalidateTag("cart", "max");
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) ||
        "An error occurred while deleting the cart item.",
    };
  }
};

export const decrementCartItemQuantityAction = async (
  medicineId: string,
  quantity: number,
): Promise<TResult> => {
  try {
    const { success, message, data } =
      await cartService.decrementCartItemQuantity(medicineId, quantity);
    revalidateTag("cart", "max");
    return { success, message, data };
  } catch (error) {
    return {
      success: false,
      message:
        getErrorMessage(error) ||
        "An error occurred while decrementing the cart item quantity.",
    };
  }
};
