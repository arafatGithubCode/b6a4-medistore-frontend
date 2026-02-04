"use client";
import { updateOrderStatusAction } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/helpers/get-error";

import { OrderStatus } from "@/types/order-type";
import { useState } from "react";
import { toast } from "sonner";
const UpdateOrderStatus = ({
  currentStatus,
  id,
}: {
  currentStatus: string;
  id: string;
}) => {
  const validTransitions: Record<
    (typeof OrderStatus)[keyof typeof OrderStatus],
    (typeof OrderStatus)[keyof typeof OrderStatus][]
  > = {
    [OrderStatus.PLACED]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.CANCELLED]: [],
  };

  const [loading, setLoading] = useState(false);

  const handleUpdateOrderStatus = async (newStatus: string) => {
    setLoading(true);
    const toastId = toast.loading("Updating order status...");
    try {
      const { success } = await updateOrderStatusAction(id, newStatus);
      if (success === false) {
        toast.error("Failed to update order status", { id: toastId });
      }

      toast.success("Order status updated successfully", { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        {currentStatus === OrderStatus.DELIVERED ? (
          <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Order Delivered Successfully
          </span>
        ) : (
          <span>Update Order Status to</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {validTransitions[currentStatus as keyof typeof validTransitions].map(
          (status) => (
            <Button
              onClick={() => handleUpdateOrderStatus(status)}
              key={status}
              disabled={loading}
              variant="outline"
              size="sm"
              className="rounded-full px-4"
            >
              {status}
            </Button>
          ),
        )}
        {validTransitions[currentStatus as keyof typeof validTransitions]
          .length === 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            No further actions available.
          </span>
        )}
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
