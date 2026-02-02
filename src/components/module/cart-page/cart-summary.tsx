import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartSummary = ({
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  cartId,
}: {
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
  cartId: string | undefined;
}) => {
  return (
    <div className="lg:col-span-1 mt-14">
      <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Order Summary
        </h2>

        <div className="space-y-2 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Subtotal</span>
            <span>৳{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Tax (10%)</span>
            <span>৳{calculateTax().toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white pt-4">
          <span>Total</span>
          <span>৳{calculateTotal().toFixed(2)}</span>
        </div>

        <Link href="/checkout">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/shop">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
