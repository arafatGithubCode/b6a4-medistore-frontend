import { IMedicine } from "./medicine-type";

export interface ICartItem {
  medicineId: string;
  quantity: number;
  cartId: string;
  id: string;
  medicine: IMedicine;
}

export interface ICart {
  items: ICartItem[];
  id: string;
  userId: string;
}
