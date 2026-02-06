import { env } from "@/env";
import { getErrorMessage } from "@/helpers/get-error";
import { TResult } from "@/types";
import { cookies } from "next/headers";

export const reviewService = {
  leaveReview: async (
    orderId: string,
    reviewData: { rating: number; content: string },
  ): Promise<TResult<null>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/reviews/${orderId}`;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          content: reviewData.content,
        }),
      });
      const result = await response.json();

      console.log("Review submission result:", result);

      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to submit review",
        };
      }
      return {
        success: true,
        message: "Review submitted successfully",
      };
    } catch (error) {
      console.error("Error submitting review:", error);
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to submit your review",
      };
    }
  },
};
