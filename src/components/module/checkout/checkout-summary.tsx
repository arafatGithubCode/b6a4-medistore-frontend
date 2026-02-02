import { ICartItem } from "@/types";
import { CheckoutItem } from "./checkout-item";

interface CheckoutSummaryProps {
  items: ICartItem[];
}

export const CheckoutSummary = ({ items }: CheckoutSummaryProps) => {
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      return total + item.medicine.price * item.quantity;
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateShipping = () => {
    return 50; // Flat shipping rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Order Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span className="font-semibold">
            ৳{calculateSubtotal().toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Tax (10%)</span>
          <span className="font-semibold">৳{calculateTax().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Shipping</span>
          <span className="font-semibold">
            ৳{calculateShipping().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
        <span>Total</span>
        <span className="text-blue-600 dark:text-blue-400">
          ৳{calculateTotal().toFixed(2)}
        </span>
      </div>

      {/* Discount Info */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-800 dark:text-green-300">
          🎉 Free shipping on orders over ৳500!
        </p>
      </div>
    </div>
  );
};
