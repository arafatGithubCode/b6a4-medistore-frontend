import { getCapitalize } from "@/helpers/get-capitalize";
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
  isPasswordMatch?: boolean;
}

const FormField = ({
  field,
  type = "text",
  isPasswordMatch = true,
}: FormFieldProps) => {
  const { name, state, handleChange } = field;
  const { meta, value } = state;
  const isInvalid = meta.isTouched && !meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{getCapitalize(name)}</FieldLabel>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={meta.errors} />}
      {!isInvalid && !isPasswordMatch && (
        <FieldError errors={[{ message: "Passwords do not match" }]} />
      )}
    </Field>
  );
};

export default FormField;
