export type { ICart, ICartItem } from "./cart-type";
export type { ICategory } from "./category-type";
export { ROLE } from "./enum";
export type {
  IOrder,
  IOrderPayload,
  PaymentMethodType,
  ShippingAddress,
} from "./order-type";
export type { TResult } from "./return-type";
export type { TRoute } from "./routes-type";
export type { Session, SessionWithUser, User } from "./session-type";

export const MedicineStatus = {
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
} as const;
export interface FilterOptions {
  searchTerm: string | undefined;
  status: (typeof MedicineStatus)[keyof typeof MedicineStatus] | undefined;
  categoryId: string | undefined;
  id: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export interface ICacheOptions {
  cache?: RequestCache;
  revalidate?: number;
}
