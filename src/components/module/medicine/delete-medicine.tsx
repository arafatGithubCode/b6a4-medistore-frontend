"use client";

import { deleteMedicineByIdAction } from "@/actions/medicine";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteMedicine = ({ medicineId }: { medicineId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteMedicine = async () => {
    const toastId = toast.loading("Deleting medicine...");
    setLoading(true);
    try {
      const { success } = await deleteMedicineByIdAction(medicineId);
      if (success === false) {
        toast.error("Failed to delete medicine", { id: toastId });
        return;
      }
      toast.success("Medicine deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("An error occurred while deleting medicine", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={handleDeleteMedicine}>
      <Trash
        aria-disabled={loading}
        className="h-4 w-4 text-red-600 dark:text-red-300"
      />
    </Button>
  );
};

export default DeleteMedicine;
