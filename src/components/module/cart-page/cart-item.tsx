import { ICartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartItem = ({
  item,
  handleIncrementQuantity,
  handleDecrementQuantity,
  handleDeleteItem,
}: {
  item: ICartItem;
  handleIncrementQuantity: (itemId: string) => void;
  handleDecrementQuantity: (itemId: string) => void;
  handleDeleteItem: (itemId: string) => void;
}) => {
  const medicine = item.medicine;
  return (
    <div
      key={item.id}
      className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-700/50 rounded-lg overflow-hidden">
        <Image
          src="/medicine.png"
          alt={medicine.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500 mb-1">
            {medicine.brand}
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {medicine.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Price: <span className="font-semibold">৳{medicine.price}</span>
          </p>
        </div>

        {/* Quantity & Actions */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Control */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => handleDecrementQuantity(item.id)}
              disabled={item.quantity <= 1}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <span className="w-8 text-center font-semibold text-slate-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => handleIncrementQuantity(item.id)}
              disabled={item.quantity >= medicine.stock}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Increase quantity"
            >
              <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Subtotal & Delete */}
          <div className="text-right flex items-center gap-3">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subtotal
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                ৳{(medicine.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
              title="Delete item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
