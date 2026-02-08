import { env } from "@/env";

const BASE_URL = env.BACKEND_URL;
const API_V1 = `${BASE_URL}/api/v1`;
const API_AUTH = `${BASE_URL}/api/auth`;

export const API_ENDPOINTS = {
  // Cart endpoints
  CARTS: `${API_V1}/carts/`,
  CART_ITEM: `${API_V1}/carts/item`,
  CART_DECREMENT: (medicineId: string) =>
    `${API_V1}/carts/decrement/${medicineId}`,

  // Category endpoints
  CATEGORIES: `${API_V1}/categories/`,
  CATEGORY_BY_ID: (id: string) => `${API_V1}/categories/id/${id}`,
  CATEGORY_BY_SLUG: (slug: string) => `${API_V1}/categories/${slug}`,
  CATEGORY_UPDATE: (id: string) => `${API_V1}/categories/${id}`,
  CATEGORY_DELETE: (id: string) => `${API_V1}/categories/${id}`,

  // Medicine endpoints
  MEDICINES: `${API_V1}/medicines/`,
  MEDICINE_BY_ID: (medicineId: string) => `${API_V1}/medicines/${medicineId}`,
  MEDICINE_BY_SELLER: (sellerId: string) =>
    `${API_V1}/medicines/seller/${sellerId}`,

  // Order endpoints
  ORDERS: `${API_V1}/orders/`,
  ORDER_BY_ID: (orderId: string) => `${API_V1}/orders/${orderId}`,
  ORDER_SELLER: `${API_V1}/orders/seller`,
  ORDER_STATUS: (orderId: string) => `${API_V1}/orders/${orderId}/status`,
  ORDER_CANCEL: (orderId: string) => `${API_V1}/orders/${orderId}/cancel`,

  // Review endpoints
  REVIEWS_BY_ORDER: (orderId: string) => `${API_V1}/reviews/${orderId}`,
  REVIEWS_BY_MEDICINE: (medicineId: string) =>
    `${API_V1}/reviews/medicine/${medicineId}`,
  REVIEW_UPDATE: (reviewId: string) => `${API_V1}/reviews/${reviewId}`,

  // User endpoints
  USER_SESSION: `${API_AUTH}/get-session`,
  USERS: `${API_V1}/users`,
  USER_BY_ID: (userId: string) => `${API_V1}/users/${userId}`,
};
