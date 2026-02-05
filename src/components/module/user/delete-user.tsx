"use client";

import { deleteUserByIdAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUser = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting user...");
    try {
      const { success } = await deleteUserByIdAction(userId);
      if (success === false) {
        toast.error("Failed to delete user", { id: toastId });
      }

      toast.success("User deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete User"}
    </Button>
  );
};

export default DeleteUser;
