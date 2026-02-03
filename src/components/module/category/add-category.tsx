"use client";

import { createCategoryAction } from "@/actions/category";
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
import { getErrorMessage } from "@/helpers/get-error";
import { categorySchema } from "@/validations/category-schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Adding category...");
      try {
        const { success } = await createCategoryAction(value.name);

        if (success === false) {
          toast.error("Failed to add category", { id: toastId });
        }
        toast.success("Category added successfully", { id: toastId });
        form.reset();
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
        <CardDescription>
          Use the form below to add a new category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => <FormField field={field} />}
          />
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton
          formName="category-form"
          loading={loading}
          label="Add Category"
        />
      </CardFooter>
    </Card>
  );
};

export default AddCategory;
