"use client";

import { Label } from "@/components/ui/label";
import { PaymentMethodType } from "@/types";
import { useState } from "react";

interface PaymentMethodProps {
  onPaymentMethodChange: (method: PaymentMethodType) => void;
}

export const PaymentMethod = ({
  onPaymentMethodChange,
}: PaymentMethodProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("CASH_ON_DELIVERY");

  const handleMethodChange = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    onPaymentMethodChange(method);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        {/* Cash on Delivery */}
        <div
          onClick={() => handleMethodChange("CASH_ON_DELIVERY")}
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMethod === "CASH_ON_DELIVERY"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="CASH_ON_DELIVERY"
            checked={selectedMethod === "CASH_ON_DELIVERY"}
            onChange={() => handleMethodChange("CASH_ON_DELIVERY")}
            className="w-4 h-4 text-blue-600"
          />
          <div className="ml-4 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-slate-600 dark:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div>
              <Label className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Cash on Delivery
              </Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pay when you receive
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedMethod === "CASH_ON_DELIVERY" && (
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Pay with cash when your order is delivered to your doorstep.
          </p>
        </div>
      )}
    </div>
  );
};
