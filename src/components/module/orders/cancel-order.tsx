"use client";

import { cancelOrderAction } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/helpers/get-error";
import { useState } from "react";
import { toast } from "sonner";

const CancelOrder = ({ orderId }: { orderId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    const toastId = toast.loading("Cancelling order...");
    try {
      const { success } = await cancelOrderAction(orderId);

      if (success === false) {
        toast.error("Failed to cancel order", { id: toastId });
      }
      toast.success("Order cancelled successfully", { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant="destructive" onClick={handleCancel} disabled={loading}>
      {loading ? "Cancelling..." : "Cancel"}
    </Button>
  );
};

export default CancelOrder;
