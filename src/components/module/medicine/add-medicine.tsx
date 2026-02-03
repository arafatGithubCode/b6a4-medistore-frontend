"use client";

import { createMedicineAction } from "@/actions/medicine";
import FormField from "@/components/common/form-field";
import SubmitButton from "@/components/common/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/helpers/get-error";
import { cn } from "@/lib/utils";
import { DosageForm, MedicineStatus, Unit } from "@/types/medicine-type";
import { addMedicineSchema } from "@/validations/add-medicine-schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

const AddMedicineForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOTCOnly, setIsOTCOnly] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      dosageForm: "",
      unit: "",
      strength: "",
      stock: "0",
      price: "0",
      image: "images/not-implemented.png",
      status: "AVAILABLE",
      isOTCOnly: isOTCOnly,
      categoryId: "",
    },
    validators: {
      onSubmit: addMedicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding medicine...");

      if (isOTCOnly) {
        value.isOTCOnly = true;
      } else {
        toast.error("OTC Only must be checked to add medicine.", {
          id: toastId,
        });
        return;
      }
      setLoading(true);
      try {
        const {
          name,
          brand,
          description,
          dosageForm,
          unit,
          strength,
          stock,
          price,
          image,
          status,
          isOTCOnly,
          categoryId,
        } = value;
        const { success } = await createMedicineAction({
          name,
          brand,
          description,
          dosageForm: dosageForm as unknown as DosageForm,
          unit: unit as unknown as Unit,
          strength,
          stock: parseInt(stock),
          price: parseFloat(price),
          image,
          status: status as unknown as MedicineStatus,
          isOTCOnly,
          categoryId,
        });

        if (success === false) {
          toast.error("Failed to add medicine.", {
            id: toastId,
          });
          return;
        }
        toast.success("Medicine added successfully!", {
          id: toastId,
        });
        form.reset();
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to add medicine.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Medicine</CardTitle>
        <CardDescription>
          Fill in the details to add a new medicine to your inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="add-medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <FieldGroup>
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="name"
                children={(field) => (
                  <FormField field={field} label="Medicine Name *" />
                )}
              />

              <form.Field
                name="brand"
                children={(field) => (
                  <FormField field={field} label="Brand *" />
                )}
              />
            </div>

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <FormField field={field} label="Description *" />
              )}
            />

            {/* Dosage & Strength */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <form.Field
                name="dosageForm"
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor="dosageForm">Dosage Form *</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger id="dosageForm">
                        <SelectValue placeholder="Select dosage form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TABLET">Tablet</SelectItem>
                        <SelectItem value="CAPSULE">Capsule</SelectItem>
                        <SelectItem value="SYRUP">Syrup</SelectItem>
                        <SelectItem value="INJECTION">Injection</SelectItem>
                        <SelectItem value="OINTMENT">Ointment</SelectItem>
                        <SelectItem value="DROPS">Drops</SelectItem>
                        <SelectItem value="INHALER">Inhaler</SelectItem>
                        <SelectItem value="PATCH">Patch</SelectItem>
                        <SelectItem value="SUPPOSITORY">Suppository</SelectItem>
                        <SelectItem value="POWDER">Powder</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />

              <form.Field
                name="strength"
                children={(field) => (
                  <FormField field={field} label="Strength *" />
                )}
              />

              <form.Field
                name="unit"
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor="unit">Unit *</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="ML">ML</SelectItem>
                        <SelectItem value="G">G</SelectItem>
                        <SelectItem value="IU">IU</SelectItem>
                        <SelectItem value="MCG">MCG</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />
            </div>

            {/* Stock & Price */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="stock"
                children={(field) => (
                  <FormField field={field} label="Stock Quantity *" />
                )}
              />

              <form.Field
                name="price"
                children={(field) => (
                  <FormField field={field} label="Price (BDT) *" />
                )}
              />
            </div>

            {/* Image URL */}
            <form.Field
              name="image"
              children={(field) => (
                <FormField field={field} label="Image URL *" />
              )}
            />

            {/* Category & Status */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="categoryId"
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor="categoryId">Category *</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger id="categoryId">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pain-relief">Pain Relief</SelectItem>
                        <SelectItem value="cold-flu">Cold & Flu</SelectItem>
                        <SelectItem value="digestion">Digestion</SelectItem>
                        <SelectItem value="vitamins">Vitamins</SelectItem>
                        <SelectItem value="antibiotics">Antibiotics</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />

              <form.Field
                name="status"
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="OUT_OF_STOCK">
                          Out of Stock
                        </SelectItem>
                        <SelectItem value="DISCONTINUED">
                          Discontinued
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            {/* OTC Only */}
            <Field>
              <div className="flex items-center gap-2">
                <input
                  id="otcOnly"
                  type="checkbox"
                  checked={isOTCOnly}
                  onChange={(e) => setIsOTCOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <FieldLabel htmlFor="otcOnly" className="mb-0">
                  Over The Counter (OTC) Only
                </FieldLabel>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardContent className="border-t pt-6">
        <SubmitButton
          loading={loading}
          formName="add-medicine-form"
          label="Add Medicine"
        />
      </CardContent>
    </Card>
  );
};

export default AddMedicineForm;
