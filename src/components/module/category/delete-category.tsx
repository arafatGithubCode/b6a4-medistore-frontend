"use client";
import { deleteCategoryAction } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/helpers/get-error";
import { useState } from "react";
import { toast } from "sonner";

const DeleteCategory = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteCategory = async (id: string) => {
    setLoading(true);
    const toastId = toast.loading("Deleting category...");
    try {
      const { success } = await deleteCategoryAction(id);
      if (success === false) {
        toast.error("Failed to delete category", { id: toastId });
      }
      toast.success("Category deleted successfully", { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={() => handleDeleteCategory(id)}
      variant="destructive"
      size="sm"
    >
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteCategory;
