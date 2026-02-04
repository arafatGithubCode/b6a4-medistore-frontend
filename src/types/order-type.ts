export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type PaymentMethodType =
  | "DEBIT_CARD"
  | "CREDIT_CARD"
  | "CASH_ON_DELIVERY"
  | "MOBILE_PAYMENT";

export interface IOrderPayload {
  items: any[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
}

export interface IOrder {
  id: string;
  items: any[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const OrderStatus = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;
