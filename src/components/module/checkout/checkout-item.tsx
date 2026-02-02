import { ICartItem } from "@/types";
import Image from "next/image";

interface CheckoutItemProps {
  item: ICartItem;
}

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const medicine = item.medicine;
  const itemTotal = medicine.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
      {/* Product Image */}
      <div className="relative w-20 h-20 shrink-0 bg-white dark:bg-slate-700 rounded-lg overflow-hidden">
        <Image
          src="/medicine.png"
          alt={medicine.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
          {medicine.brand}
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-1">
          {medicine.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Qty: <span className="font-semibold">{item.quantity}</span>
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ৳{medicine.price} × {item.quantity}
          </p>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex items-center">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          ৳{itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
