"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { reviewService } from "@/services/review-service";

export const leaveReviewAction = async (
  orderId: string,
  reviewData: { rating: number; content: string },
) => {
  try {
    const { success, message } = await reviewService.leaveReview(
      orderId,
      reviewData,
    );
    return { success, message };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
