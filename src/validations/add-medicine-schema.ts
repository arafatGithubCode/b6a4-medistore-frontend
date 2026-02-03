import * as z from "zod";

export const addMedicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  dosageForm: z.string().min(1, "Dosage form is required"),
  strength: z.string().min(1, "Strength is required"),
  unit: z.string().min(1, "Unit is required"),
  stock: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), "Stock must be a number")
    .refine((val) => parseInt(val) >= 0, "Stock cannot be negative"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Price must be a number")
    .refine((val) => parseFloat(val) >= 0, "Price cannot be negative"),
  image: z.string().min(1, "Just provide text URL of the image"),
  status: z.string().min(1, "Status is required"),
  isOTCOnly: z.boolean(),
  categoryId: z.string().min(1, "Category ID is required"),
});
