"use client";

import { addToCartAction } from "@/actions/cart";
import { getErrorMessage } from "@/helpers/get-error";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const AddToCart = ({
  isInStock,
  item,
}: {
  isInStock: boolean;
  item: { medicineId: string; quantity: number };
}) => {
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session?.user) {
      toast.warning("You must be logged in to add items to the cart.");
      router.push("/signin");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Adding to cart...");
    try {
      const { message, success } = await addToCartAction(item);

      if (success === false) {
        toast.error(message || "Failed to add item to cart.", { id: toastId });
        return;
      }
      toast.success(message || "Item added to cart successfully.", {
        id: toastId,
      });
      
      // Trigger navbar cart update
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        disabled={!isInStock || loading}
        type="submit"
        className={`
              ${
                isInStock
                  ? "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md dark:bg-teal-500 dark:hover:bg-teal-400"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500"
              }`}
      >
        {isInStock ? (loading ? "Adding..." : "Add to Cart") : "Out of Stock"}
      </Button>
    </form>
  );
};

export default AddToCart;
