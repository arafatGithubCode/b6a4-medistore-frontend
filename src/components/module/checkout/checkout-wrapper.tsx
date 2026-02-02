"use client";

import { Button } from "@/components/ui/button";
import { ICart } from "@/types";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CheckoutSummary } from "./checkout-summary";
import { PaymentMethod, PaymentMethodType } from "./payment-method";
import { ShippingAddress, ShippingAddressForm } from "./shipping-address-form";

interface CheckoutWrapperProps {
  cart: ICart | undefined;
}

export const CheckoutWrapper = ({ cart }: CheckoutWrapperProps) => {
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid = () => {
    return (
      shippingAddress.fullName &&
      shippingAddress.email &&
      shippingAddress.phone &&
      shippingAddress.address &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.zipCode &&
      shippingAddress.country
    );
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!cart?.items || cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      toast.success("Order placed successfully!");
      setIsProcessing(false);
      // router.push("/dashboard"); // Redirect to order confirmation
    }, 2000);
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Add some medicines to your cart before checking out.
          </p>
          <Link href="/shop">
            <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </Link>

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Checkout
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Complete your order by providing shipping details and payment
          information.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <ShippingAddressForm onAddressChange={setShippingAddress} />

          {/* Payment Method */}
          <PaymentMethod onPaymentMethodChange={setPaymentMethod} />

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Secure Checkout
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Your information is encrypted and secure. We never store your
                payment details.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <CheckoutSummary items={cart.items} />

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={!isFormValid() || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              By placing your order, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-slate-900 dark:hover:text-white"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:text-slate-900 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
