"use client";

import { updateCategoryAction } from "@/actions/category";
import FormField from "@/components/common/form-field";
import SubmitButton from "@/components/common/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/category-type";
import { updateCategorySchema } from "@/validations/update-category-schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

const UpdateCategory = ({
  category,
  onClose,
}: {
  category: ICategory;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(category.isActive);

  const form = useForm({
    defaultValues: {
      name: category.name,
      isActive: category.isActive,
    },
    validators: {
      onSubmit: updateCategorySchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Updating category...");

      setIsActive(value.isActive);

      try {
        const { success } = await updateCategoryAction(category.id, {
          name: value.name,
          isActive: value.isActive,
        });

        if (success === false) {
          toast.error("Failed to update category", { id: toastId });
        }
        toast.success("Category updated successfully", { id: toastId });
        onClose();
      } catch (error) {
        toast.error("Failed to update category", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
        <CardDescription>
          Use this form to update the category details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => <FormField field={field} />}
          />

          <form.Field
            name="isActive"
            children={(field) => (
              <Field
                className="mt-3"
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <FieldLabel>Status</FieldLabel>
                <Select
                  value={isActive ? "active" : "inactive"}
                  onValueChange={(value) => {
                    field.setValue(value === "active");
                    setIsActive(value === "active");
                  }}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton
          formName="update-category-form"
          label="Update Category"
          loading={loading}
        />
      </CardFooter>
    </Card>
  );
};

export default UpdateCategory;
