"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { reviewService } from "@/services/review-service";
import { revalidateTag } from "next/cache";

export const leaveReviewAction = async (
  orderId: string,
  reviewData: { rating: number; content: string },
) => {
  try {
    const { success, message } = await reviewService.leaveReview(
      orderId,
      reviewData,
    );
    revalidateTag("reviews", "max");
    revalidateTag("orders", "max");
    return { success, message };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getReviewsByMedicineIdAction = async (medicineId: string) => {
  try {
    const { success, data, message } =
      await reviewService.getReviewsByMedicineId(medicineId);
    return { success, data, message };
  } catch (error) {
    return { success: false, data: [], message: getErrorMessage(error) };
  }
};

export const updateReviewAction = async (
  reviewId: string,
  reviewData: { rating: number; content: string },
) => {
  try {
    const { success, data, message } = await reviewService.updateReview(
      reviewId,
      reviewData,
    );
    revalidateTag("reviews", "max");
    revalidateTag("orders", "max");
    return { success, data, message };
  } catch (error) {
    return { success: false, data: null, message: getErrorMessage(error) };
  }
};
