"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const SubmitButton = ({
  loading = false,
  formName,
  label,
}: {
  loading?: boolean;
  formName?: string;
  label: string;
}) => {
  const { pending } = useFormStatus();
  const isLoading = loading || pending;

  return (
    <Button form={formName} className="w-full" disabled={isLoading}>
      {isLoading ? "Loading..." : label}
    </Button>
  );
};

export default SubmitButton;
