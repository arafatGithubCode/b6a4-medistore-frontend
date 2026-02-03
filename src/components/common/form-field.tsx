"use client";

import { getCapitalize } from "@/helpers/get-capitalize";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormFieldProps {
  field: {
    name: string;
    state: {
      meta: { isTouched: boolean; isValid: boolean; errors: any };
      value: string;
    };
    handleChange: (value: string) => void;
  };
  type?: string;
  hasPasswordField?: boolean;
  label?: string;
}

const FormField = ({
  field,
  type = "text",
  hasPasswordField = false,
  label,
}: FormFieldProps) => {
  const { name, state, handleChange } = field;
  const { meta, value } = state;
  const isInvalid = meta.isTouched && !meta.isValid;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label || getCapitalize(name)}</FieldLabel>
      <div className="relative">
        <Input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          aria-invalid={isInvalid}
        />
        {hasPasswordField &&
          (showPassword ? (
            <EyeOff
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer inline-block"
              onClick={() => setShowPassword(false)}
              size={16}
            />
          ) : (
            <Eye
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer inline-block"
              onClick={() => setShowPassword(true)}
              size={16}
            />
          ))}
      </div>
      {isInvalid && <FieldError errors={meta.errors} />}
    </Field>
  );
};

export default FormField;
