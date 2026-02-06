import { env } from "@/env";
import { getErrorMessage } from "@/helpers/get-error";
import { TResult } from "@/types";
import { IReview } from "@/types/review-type";
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
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to submit your review",
      };
    }
  },

  getReviewsByMedicineId: async (
    medicineId: string,
  ): Promise<TResult<any[]>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/reviews/medicine/${medicineId}`;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["reviews"] },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to fetch reviews",
        };
      }
      return {
        message: "Reviews fetched successfully",
        success: true,
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to fetch reviews",
      };
    }
  },

  updateReview: async (
    reviewId: string,
    reviewData: { rating: number; content: string },
  ): Promise<TResult<IReview>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/reviews/${reviewId}`;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "PATCH",
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
      if (result.success === false) {
        return {
          success: false,
          message: result.message || "Failed to update review",
        };
      }
      return {
        success: true,
        message: "Review updated successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to update your review",
      };
    }
  },
};
