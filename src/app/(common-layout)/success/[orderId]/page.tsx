import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Truck } from "lucide-react";
import Link from "next/link";

const SuccessPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Order Placed Successfully! #${orderId}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl">
              Thank you for your purchase. Your order has been confirmed and
              will be processed shortly. We’ve sent a confirmation to your
              email.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center bg-slate-50 dark:bg-slate-800/40">
              <Package className="w-6 h-6 mx-auto text-slate-700 dark:text-slate-300" />
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                Processing
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We’re preparing your items
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center bg-slate-50 dark:bg-slate-800/40">
              <Truck className="w-6 h-6 mx-auto text-slate-700 dark:text-slate-300" />
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                Shipping
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Estimated 2-3 business days
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center bg-slate-50 dark:bg-slate-800/40">
              <CheckCircle2 className="w-6 h-6 mx-auto text-green-600 dark:text-green-400" />
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                Delivered
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We’ll notify you on delivery
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Continue Shopping</Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Need help? Contact our support team at support@medistore.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
